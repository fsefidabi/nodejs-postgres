process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/"
const { Pool } = require('pg')
const config = require('config')

const pgDbConfig = config.get('postgresDbConfig');

(async function createDatabaseIfNotExists () {
  const pool = new Pool(pgDbConfig)

  try {
    await pool.query('CREATE DATABASE test')
    console.log('"test" database created successfully.')
  } catch (err) {
    if (err.message.indexOf('does not exist')) {
      console.log('"test" database already exists.')
    } else {
      console.log(err)
    }
  } finally {
    await pool.end()
  }
})()

const pool = new Pool(pgDbConfig)

module.exports = { pool }
