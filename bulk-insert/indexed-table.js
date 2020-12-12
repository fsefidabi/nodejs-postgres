const { db, insertNewRows } = require('../lib/insert-stream')
const { createTable } = require('../lib/create-table')
const { table } = require('../lib/argv')

const indexes = ["launchTime", "launchCount", "installDate", "tags", "deviceModel"];

(async () => {
  try {
    await createTable(table)
    indexes.map(async index => {
      try {
        await db.query((`create index "${index}_idx" on ${table}("${index}")`))
        console.log(` "${index}_idx" index created successfully on "${table}" table.`)
      } catch (err) {
        console.log(` "${index}_idx" index exists.`)
      }
    })
    await insertNewRows()
  } catch (err) {
    console.log(err)
  }
})()
