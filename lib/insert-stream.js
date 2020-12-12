const { Readable, Writable, pipeline } = require('stream')
const batch2 = require('batch2')
const bPromise = require('bluebird')
const config = require('config')
const randomData = require('../lib/generate-random-data')
const { columns } = require('../lib/schema')
const { table, batch, numberOfRows } = require('../lib/argv')

const dbConfig = config.get('dbConfig')
const initOptions = { promiseLib: bPromise }
const pgp = require('pg-promise')(initOptions)
const db = pgp({ ...dbConfig, database: 'test' })
const fields = extractColNames()
const cs = new pgp.helpers.ColumnSet(fields, { table: `${table}` })

async function insertNewRows () {
  let count = 0
  let oldCount = 0

  class DataGeneratorStream extends Readable {
    constructor (n, options) {
      super(options)
      this.n = n
      this.i = 0
    }

    _read () {
      if (this.i >= this.n) {
        return this.push(null)
      }
      const device = randomData()
      this.push(device)
      this.i++
    }
  }

  const devicesReadableStream = new DataGeneratorStream(numberOfRows, { objectMode: true })

  const insertStreamToTable = new Writable({
    objectMode: true,
    async write (chunk, encoding, callback) {
      await db.none(pgp.helpers.insert(chunk, cs))
      callback()
      count += chunk.length
    }
  })

  insertStreamToTable.on('close', () => {
    console.log(`*** ${numberOfRows} rows inserted successfully ***`)
    clearInterval(interval)
  })

  pipeline(
    devicesReadableStream,
    batch2.obj({ size: batch }),
    insertStreamToTable,
    err => console.log(err)
  )

  const interval = setInterval(() => {
    const rate = (count - oldCount)
    console.log(`Insertion rate: ${rate} rows/sec`)
    oldCount = count
  }, 12000)
}

function extractColNames () {
  const fields = columns.map(col => ({ name: col.name }))
  return fields
}

module.exports = { insertNewRows, pgp, db }
