const { pool } = require('../bin/server')
const { columns } = require('./schema')

const fields = columns.map(col => `"${col.name}" ${col.type} ${col.constraints}`)

async function createTable (tableName) {
  try {
    await pool.query(`create table if not exists ${tableName} (id SERIAL, ${fields})`)
  } catch (err) {
    console.log(err.message)
  }
  console.log(`connected to "${tableName}" table.`)
}

module.exports = { createTable }
