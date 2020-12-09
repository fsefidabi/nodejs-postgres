const config = require('config')
const tableName = config.get('Device.tableName')
const queryBuilder = require('./testQueryBuilder')

const condition = {
  tags: ['male','vip','L1'],
  "userInfo_categories": ['orange', 'apple'],
  event_purchase_count: 2,
  connection: '3G',
  "tokenStatus": '%ED'
}

const values = (Object.values(condition));
let queryText = `select count(*) from ${tableName} where "tags" = ($1) and "userInfo_categories" in ($2) or
 event_purchase_count >= ($3) or connection in ($4) and "tokenStatus" in ($5)`;

queryBuilder(queryText, values)
