const config = require('config')

const tableName = config.get('Device.tableName')

async function calculateTime (connection) {
  const query = `select count (*) from ${tableName}`
  const firstCount = await connection.query(query)
  let oldCount = Number(firstCount.rows[0].count)

  setInterval(async () => {
    const queryResult = await connection.query(query)
    let count = Number(queryResult.rows[0].count)
    const rate = count - oldCount
    console.log(`Insertion rate: ${rate} rows/sec`)
    oldCount = count
  }, 1000)
}

module.exports = calculateTime
