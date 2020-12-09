const config = require('config')
const { pool } = require('../db/index')

const tableName = config.get('Device.tableName')

const condition1 = {
  '"launchCount"': 210,
  connection: 'WiFi',
  tags: '{male}',
  event_purchase_count: 3,
  '"appVersion"': '0.8.9'
}

const condition2 = {
  '"osVersion"': '1.1.1-staging',
  '"deviceModel"': 'S6',
  '"appVersion"': '0.8.9',
  '"userInfo_categories"': '{berry,pumbkin,apple,golabi}'
}

const condition3 = {
  tags: '{male,vip,L1}',
  '"userInfo_categories"': '{golabi}',
  event_purchase_count: 2,
  connection: '3G',
  '"tokenStatus"': 'ALLOWED'
}

const values = (Object.values(condition3))
const queryText = selectQuery(condition3);

(async () => {
  try {
    const query = await pool.query(`${queryText}`, values)
    console.table(query.rows[0])
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
})()

function selectQuery (obj) {
  let queryText = `select count(*) from ${tableName} where ${Object.keys(obj)[0]} in ($1)`
  const conditionAmount = Object.keys(obj).length
  for (let i = 1; i < conditionAmount; i++) {
    queryText = `${queryText} and ${Object.keys(obj)[i]} in ($${i + 1})`
  }
  return queryText
}
