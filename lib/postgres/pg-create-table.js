const { pool } = require('../../db/pg')
const { columns } = require('../schema')

const fields = columns.map(col => `"${col.name}" ${col.pgType} ${col.constraints}`)

async function pgCreateTable (tableName) {
  try {
    await pool.query(`create table if not exists ${tableName} (id SERIAL, ${fields})`)
  } catch (err) {
    console.log(err.message)
  }
  console.log(`connected to "${tableName}" table.`)
}

module.exports = { pgCreateTable }
