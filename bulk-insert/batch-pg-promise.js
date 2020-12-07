const { Readable, Writable, pipeline } = require('stream')
const batch2 = require('batch2')
const bPromise = require('bluebird')
const { database } = require('../library/reusable-variables')
const randomData = require('../library/generate-random-data')

const initOptions = {
  promiseLib: bPromise
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(database)
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
  { name: 'user_info_categories' },
], { table: 'users' });

(async () => {
  try {
    await insertNewRows()
  } catch (err) {
    console.log(err)
  }

  async function insertNewRows () {
    const dataGeneratorStream = new Readable({
      objectMode: true,
      read () {
        const user = randomData()
        this.push(user)
      }
    })

    const writeStreamToTable = new Writable({
      objectMode: true,
      async write (chunk, encoding, callback) {
        // console.log(chunk)
        await db.none(pgp.helpers.insert(chunk, cs))
        callback()
      }
    })

    pipeline(
      dataGeneratorStream,
      batch2.obj({ size: 500 }),
      writeStreamToTable,
      err => console.log(err)
    )
  }

  let count, oldCount
  db.any('select count (*) from users')
    .then(data => {
      oldCount = Number(data[0].count)
    })

  setInterval(() => {
    db.any('select count (*) from users')
      .then(data => {
        count = Number(data[0].count)
        const rate = count - oldCount
        console.log(`Insertion rate: ${rate} rows/sec`)
        oldCount = count
      })
      .catch(err => console.log(err))
  }, 1000)
})()
