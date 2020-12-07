const bPromise = require('bluebird')
const { testDb, tableName } = require('../library/reusable-variables')

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
], { table: `${tableName}` });

(async () => {
  try {
    await query()
  } catch (err) {
    console.log(err)
  }

  async function query () {
    try {
      const test = await db.any('select count(*) from users where launch_count between $1 and $2', [1, 180])
      console.log(test)
    } catch (err) {
      console.log(err)
    }
  }
})()
