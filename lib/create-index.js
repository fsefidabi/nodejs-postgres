const { pool } = require('../bin/server')
const { table } = require('../lib/argv')

const indexes = ["launchCount", "launchTime", "installDate", "tags", "deviceModel"];

(function createIndex () {
  try {
    indexes.map(async index => {
      try {
        await pool.query((`create index "${index}_idx" on ${table}("${index}")`))
        console.log(`"${index}_idx" index created successfully on "${table}" table.`)
      } catch (err) {
        console.log(`"${index}_idx" index exists.`)
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
})()
