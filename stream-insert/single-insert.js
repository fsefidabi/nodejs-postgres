const { Readable, Writable, pipeline } = require('stream')
const config = require('config')
const logger = require('pino')()
const { pool } = require('../db')
const { createTable } = require('../lib/createTable')
const randomData = require('../lib/generate-random-data')
const calculateTime = require('../lib/calculate-elapsed-time')
const { columns } = require('../lib/schema')

const tableName = config.get('Device.tableName');

(async () => {
  try {
    await createTable()
    await insertNewRows()
  } catch (err) {
    logger.info(err)
  }
  await calculateTime(pool)
})()

function insertNewRows () {
  const dataGeneratorStream = new Readable({
    objectMode: true,
    read () {
      const user = randomData()
      const newUser = Object.values(user)
      this.push(newUser)
    }
  })

  const insertStreamToTable = new Writable({
    objectMode: true,
    async write (chunk, encoding, callback) {
      const columnsIndex = listNumberOfCols()
      const fields = columns.map(col => `"${col.name}"`)
      await pool.query(`insert into ${tableName} (${fields}) values (${columnsIndex})`, chunk)
      callback()
    }
  })

  pipeline(
    dataGeneratorStream,
    insertStreamToTable,
    err => logger.info(err)
  )
}

function listNumberOfCols () {
  let columnsList = ''
  for (let i = 1; i <= columns.length; i++) {
    if (i !== columns.length) {
      columnsList += `$${i}, `
    } else {
      columnsList += `$${i} `
    }
  }
  return columnsList
}
