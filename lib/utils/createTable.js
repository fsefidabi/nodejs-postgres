const config = require('config')
const logger = require('pino')()
const { pool } = require('../../db')
const { columns } = require('../schema')

const tableName = config.get('Device.tableName')
const fields = columns.map(col => `"${col.name}" ${col.type} ${col.constraints}`)

async function createTable () {
  try {
    await pool.query(`create table if not exists ${tableName} (id SERIAL, ${fields})`)
  } catch (err) {
    logger.info(err.message)
  }
}

module.exports = { createTable }
