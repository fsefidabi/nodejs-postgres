const { ParameterizedQuery: PQ } = require('pg-promise')
const { pgp, db } = require('../library/pgp-variables')

const condition1 = {
  launch_count: 210,
  connection: 'WiFi',
  tags: '{male}',
  event_purchase_count: 3,
  app_version: '0.8.9'
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

const values = (Object.values(condition3))
const queryText = selectQuery(condition3);

(async () => {
  try {
    const findUser = new PQ({ text: queryText, values: values })
    const test = await db.one(findUser)
    console.table(test)
  } catch (err) {
    console.log(err)
  } finally {
    pgp.end()
  }
})()

function selectQuery (obj) {
  let queryText = `select count(*) from users where ${Object.keys(obj)[0]} = $1`
  const conditionAmount = Object.keys(obj).length
  for (let i = 1; i < conditionAmount; i++) {
    queryText = `${queryText} and ${Object.keys(obj)[i]} = $${i + 1}`
  }
  return queryText
}
