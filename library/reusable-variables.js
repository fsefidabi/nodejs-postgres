const config = require('config')

const dbConfig = config.get('Product.dbConfig')

const postgres = {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.db,
  user: dbConfig.username,
  password: dbConfig.password
}


const database = {
  host: dbConfig.host,
  port: dbConfig.port,
  database: 'test',
  user: dbConfig.username,
  password: dbConfig.password
}

const columns = `launch_count, launch_time, install_date, os_version, device_model, device_token,
  device_type, user_id, token_status, ip, connection, app_version, created, modified, status,
  subscriptions, timezone, ad_id, tags, event_purchase_first_occurrence, event_purchase_last_occurrence,
  event_purchase_count, user_info_name, user_info_birthday, user_info_categories`

module.exports = { postgres, database, columns }