const { pool } = require('../db/pg')
const { tableName } = require('./argv');

(async function () {
  try {
    await pool.query(`drop table ${tableName}`)
    console.log(`"${tableName}" table deleted successfully.`)
  } catch (err) {
    console.log(`"${tableName}" table does not exists.`)
  } finally {
    pool.end()
  }
})()
