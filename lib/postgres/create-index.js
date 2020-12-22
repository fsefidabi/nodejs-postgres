const { pool } = require('../../db/pg')
const { tableName } = require('../argv')

module.exports = async function createIndex () {
  const indexes = ["launchCount", "launchTime", "installDate", "tags", "deviceModel"]
  try {
    await indexes.map(await function (index) {
      try {
        pool.query((`create index "${index}_idx" on ${tableName}_idx("${index}")`))
        console.log(`"${index}_idx" index has been created successfully on "${tableName}_idx" table.`)
      } catch (err) {
        console.log(err)
      }
    })

  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
}
