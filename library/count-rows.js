const argv = require('./argv')

async function countRows (clientConnection) {
  const results = await clientConnection.query(`select count(*) from ${argv.table}`)
  const totalNumOfRows = results.rows[0].count
  console.log(`Number of existing rows: ${totalNumOfRows}`)
}

module.exports = countRows
