const { pool } = require('../bin/server')
const { table } = require('../lib/argv');

(async function () {
  try {
    await pool.query(`drop table ${table}`)
    console.log(`"${table}" table deleted successfully.`)
  } catch (err) {
    console.log(`"${table}" table does not exists.`)
  } finally {
    pool.end()
  }
})()
