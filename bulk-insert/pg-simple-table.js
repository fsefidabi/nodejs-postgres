const { db, pgp, insertNewRows } = require('../lib/insert-stream')
const { pgCreateTable } = require('../lib/postgres/pg-create-table')
const { tableName } = require('../lib/argv')
const { columns } = require('../lib/schema')
const randomData = require('../lib/postgres/pg-random-data-generator')

const fields = extractColNames()
function extractColNames () {
  const fields = columns.map(col => ({ name: col.name }))
  return fields
}
const cs = new pgp.helpers.ColumnSet(fields, { table: `${tableName}` })

async function writeToTable (data) {
  await db.none(pgp.helpers.insert(data, cs))
}

(async () => {
  const deviceData = randomData()

  try {
    await pgCreateTable(tableName)
    await insertNewRows(deviceData, writeToTable)
  } catch (err) {
    console.log(err)
  } finally {
    await pgp.end
  }
})()
