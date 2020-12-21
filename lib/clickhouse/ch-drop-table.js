process.env["NODE_CONFIG_DIR"] = __dirname + "/../../config/"
const ClickHouse = require('@apla/clickhouse')
const config = require('config')
const { tableName } = require('../argv')

const chDbConfig = config.get('clickhouseDbConfig')
const ch = new ClickHouse({
  host: chDbConfig.host, port: chDbConfig.port, queryOptions: { database: chDbConfig.database }
});

(async function () {
  try {
    await ch.query(`drop table ${tableName}`)
    console.log(`"${tableName}" table deleted successfully.`)
  } catch (err) {
    console.log(`"${tableName}" table does not exists.`)
  }
})()
