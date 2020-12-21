process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/"
const ClickHouse = require('@apla/clickhouse')
const config = require('config')
const { columns } = require('../lib/schema')
const { tableName } = require('../lib/argv')
const { insertNewRows } = require('../lib/insert-stream')
const randomData = require('../lib/clickhouse/ch-random-data-generator')
const chDbConfig = config.get('clickhouseDbConfig')

const ch = new ClickHouse({ host: chDbConfig.host, port: chDbConfig.port, queryOptions: { database: chDbConfig.database } })
const fields = columns.map(col => `${col.name}`)

async function writeToTable (data) {
  let values = []
  for (let values of data) {
    values = `(${Object.values(values).join(', ')})`
  }
  values = data.map(values => `(${Object.values(values).join(', ')})`).join(', ')
  await ch.querying(`INSERT INTO test.${tableName} (${fields}) values ${values}`)
}

(async () => {
  try {
    const deviceData = randomData()
    await insertNewRows(deviceData, writeToTable)
  } catch (err) {
    console.log(err)
  }
})()
