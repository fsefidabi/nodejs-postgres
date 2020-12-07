const { pool } = require('../index')

const condition1 = {
  launch_count: 210,
  connection: 'WiFi',
  tags: '{male}',
  event_purchase_last_occurrence: '2019-2-25'

}

const condition2 = {
  os_version: '1.1.1-staging',
  device_model: 'S6',
  app_version: '0.8.9',
  user_info_categories: '{berry,pumbkin,apple,golabi}'
}

const condition3 = {
  tags: '{male,vip,L1}',
  user_info_categories: '{golabi}',
  event_purchase_count: 2,
  connection: '3G',
  token_status: 'ALLOWED'
}

const values = (Object.values(condition1))
const queryText = selectQuery(condition1);

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
  let queryText = `select count(*) from users where ${Object.keys(obj)[0]} in ($1)`
  const conditionAmount = Object.keys(obj).length
    for (let i = 1; i < conditionAmount; i++) {
      queryText = `${queryText} and ${Object.keys(obj)[i]} in ($${i+1})`
    }
  return queryText
}
