const { Pool } = require('pg')
const { postgres, database } = require('./library/reusable-variables')
const argv = require('./library/argv');

(async function createDatabaseIfNotExists () {
  const pool = new Pool(postgres);
  try {
    await pool.query(`CREATE DATABASE test`)
    console.log(`test database created successfully. Connecting to test...`)
  } catch (err) {
    if (err.message.indexOf('already exists')) {
      console.log(`test database exists. Connecting to test...`)
    } else {
      console.log(err)
    }
  } finally {
    await pool.end()
  }
})();

const pool = new Pool(database);

async function connectToDatabase () {
  try {
    await pool.query(
      `create table if not exists users (
        id SERIAL,
        launch_count INT NOT NULL,
        launch_time DATE NOT NULL,
        install_date DATE NOT NULL,
        os_version VARCHAR(15) NOT NULL,
        device_model VARCHAR(6) NOT NULL,
        device_token TEXT NOT NULL,
        device_type CHAR(7) NOT NULL,
        user_id VARCHAR(15) NOT NULL, 
        token_status VARCHAR(10) NOT NULL, 
        ip VARCHAR(15) NOT NULL, 
        connection VARCHAR(7) NOT NULL, 
        app_version VARCHAR(5) NOT NULL, 
        created DATE NOT NULL, 
        modified DATE NOT NULL, 
        status CHAR(6) NOT NULL, 
        subscriptions VARCHAR(15) NOT NULL, 
        timezone CHAR(11) NOT NULL, 
        ad_id CHAR(36) NOT NULL, 
        tags VARCHAR(50) NOT NULL,
        event_purchase_first_occurrence DATE NOT NULL,
        event_purchase_last_occurrence DATE NOT NULL,
        event_purchase_count INT NOT NULL,
        user_info_name VARCHAR(30) NOT NULL,
        user_info_birthday DATE NOT NULL,
        user_info_categories VARCHAR NOT NULL
      )`
    )
  } catch (err) {
    console.log(err)
  }
}

(async function(){
  await connectToDatabase()

})()

module.exports = { pool }
