const { Pool } = require('pg')
const config = require('config')
const logger = require('pino')()

const dbConfig = config.get('dbConfig');

(async function createDatabaseIfNotExists () {
  const pool = new Pool(dbConfig)

  try {
    await pool.query('CREATE DATABASE test')
    logger.info('"test" database created successfully.')
  } catch (err) {
    if (err.message.indexOf('does not exist')) {
      logger.info('"test" database already exists.')
    } else {
      logger.info(err)
    }
  } finally {
    await pool.end()
  }
})()

const pool = new Pool({ ...dbConfig, database: "test" })

module.exports = { pool }
