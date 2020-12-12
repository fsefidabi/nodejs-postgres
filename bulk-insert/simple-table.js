const { pgp, insertNewRows } = require('../lib/insert-stream')
const { createTable } = require('../lib/create-table')
const { table } = require('../lib/argv');

(async () => {
  try {
    await createTable(table)
    await insertNewRows()
  } catch (err) {
    console.log(err)
  } finally {
    await pgp.end
  }
})()
