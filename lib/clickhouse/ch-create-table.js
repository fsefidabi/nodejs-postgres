process.env["NODE_CONFIG_DIR"] = __dirname + "/../../config/"
const ClickHouse = require('@apla/clickhouse')
const config = require('config')
const { columns } = require('../schema')
const { tableName } = require('../argv')

const chDbConfig = config.get('clickhouseDbConfig')
const ch = new ClickHouse({
  host: chDbConfig.host, port: chDbConfig.port, queryOptions: { database: chDbConfig.database }
})
const fields = columns.map(col => `${col.name} ${col.chType}`);

(async function chCreateTable () {
  try {
    await ch.query(`CREATE TABLE ${tableName} (${fields.join(', ')}) ENGINE = MergeTree PARTITION BY toYYYYMM("launchTime") ORDER BY ("launchCount")`)
  } catch (err) {
    console.log(`${tableName} already exists.`)
  }
  console.log(`connected to "${tableName}" table.`)
})()
