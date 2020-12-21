process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/"
const { Readable, Writable, pipeline } = require('stream')
const batch2 = require('batch2')
const bPromise = require('bluebird')
const config = require('config')
const { batchSize } = require('./argv')

const pgDbConfig = config.get('postgresDbConfig')
const initOptions = { promiseLib: bPromise }
const pgp = require('pg-promise')(initOptions)
const db = pgp(pgDbConfig)

async function insertNewRows (data, writeToTable) {
  let count = 0
  let oldCount = 0

  const devicesReadableStream = new Readable({
    objectMode: true,
    read () {
      this.push(data)
    }
  })

  const insertStreamToTable = new Writable({
    objectMode: true,
    async write (chunk, encoding, callback) {
      await writeToTable(chunk)
      callback()
      count ++
    }
  })

  pipeline(
    devicesReadableStream,
    batch2.obj({ size: batchSize }),
    insertStreamToTable,
    err => console.log(err)
  )

  setInterval(() => {
    const rate = count - oldCount
    console.log(`Insertion rate: ${rate * batchSize} rows/sec`)
    oldCount = count
  }, 1000)
}

module.exports = { insertNewRows, pgp, db }
