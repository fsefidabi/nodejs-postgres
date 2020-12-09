const { Readable, Writable, pipeline } = require('stream')
const batch2 = require('batch2')
const bPromise = require('bluebird')
const config = require('config')
const logger = require('pino')()
const { createTable } = require('../lib/createTable')
const randomData = require('../lib/generate-random-data')
const { columns } = require('../lib/schema')

const dbConfig = config.get('dbConfig')
const tableName = config.get('Device.tableName')
const batchSize = config.get('Batch-flow.size')
const initOptions = { promiseLib: bPromise }
const pgp = require('pg-promise')(initOptions)
const db = pgp({ ...dbConfig, database: 'test' })
const fields = extractColNames()
const cs = new pgp.helpers.ColumnSet(fields, { table: `${tableName}` })

function extractColNames () {
  const fields = columns.map(col => ({ name: col.name }))
  return fields
}

(async () => {
  try {
    await createTable()
    await insertNewRows()
  } catch (err) {
    logger.info(err)
  }
  await calculateTime()
})()

function insertNewRows () {
  const dataGeneratorStream = new Readable({
    objectMode: true,
    read () {
      const user = randomData()
      this.push(user)
    }
  })

  const insertStreamToTable = new Writable({
    objectMode: true,
    async write (chunk, encoding, callback) {
      await db.none(pgp.helpers.insert(chunk, cs))
      callback()
    }
  })

  pipeline(
    dataGeneratorStream,
    batch2.obj({ size: batchSize }),
    insertStreamToTable,
    err => logger.info(err)
  )
}

async function calculateTime () {
  const query = `select count (*) from ${tableName}`
  const firstCount = await db.any(query)
  let oldCount = Number(firstCount[0].count)

  setInterval(async () => {
    const queryResult = await db.any(query)
    const count = Number(queryResult[0].count)
    const rate = count - oldCount
    logger.info(`Insertion rate: ${rate} rows/sec`)
    oldCount = count
  }, 1000)
}
