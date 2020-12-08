const { Pool } = require('pg')
const config = require('config')

const dbConfig = config.get('dbConfig');

(async function createDatabaseIfNotExists () {
  const pool = new Pool(dbConfig)

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
})();

const pool = new Pool({ ...dbConfig, database: "test" })

module.exports = { pool }
