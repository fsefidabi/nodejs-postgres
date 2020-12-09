const config = require('config')
const logger = require('pino')()
const tableName = config.get('Device.tableName')

async function calculateTime (connection) {
  const query = `select count (*) from ${tableName}`
  const firstCount = await connection.query(query)
  let oldCount = Number(firstCount.rows[0].count)

  setInterval(async () => {
    const queryResult = await connection.query(query)
    const count = Number(queryResult.rows[0].count)
    const rate = count - oldCount
    logger.info(`Insertion rate: ${rate} rows/sec`)
    oldCount = count
  }, 1000)
}

module.exports = calculateTime
