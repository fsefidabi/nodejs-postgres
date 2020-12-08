const { testDb, tableName } = require('../library/reusable-variables')
const bPromise = require('bluebird')
const initOptions = {
  promiseLib: bPromise
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(testDb)

const cs = new pgp.helpers.ColumnSet([
  { name: 'launch_count' },
  { name: 'launch_time' },
  { name: 'install_date' },
  { name: 'os_version' },
  { name: 'device_model' },
  { name: 'device_token' },
  { name: 'device_type' },
  { name: 'user_id' },
  { name: 'token_status' },
  { name: 'ip' },
  { name: 'connection' },
  { name: 'app_version' },
  { name: 'created' },
  { name: 'modified' },
  { name: 'status' },
  { name: 'subscriptions' },
  { name: 'timezone' },
  { name: 'ad_id' },
  { name: 'tags' },
  { name: 'event_purchase_first_occurrence' },
  { name: 'event_purchase_last_occurrence' },
  { name: 'event_purchase_count' },
  { name: 'user_info_name' },
  { name: 'user_info_birthday' },
  { name: 'user_info_categories' }
], { table: `${tableName}` })

module.exports = { pgp, db, cs }
