const config = require('config')
const tableName = config.get('Device.tableName')
const queryBuilder = require('./testQueryBuilder')

const condition = {
  '"osVersion"': '1.1.1',
  '"deviceModel"': 'S6',
  '"appVersion"': '0.9.2',
  '"userInfo_categories"': ['apple'],
  '"event_purchase_lastOccurrence"': '2018-01-01'
}

const values = (Object.values(condition));
let queryText = `select count(*) from ${tableName} where "osVersion" LIKE ($1) and "deviceModel" in ($2) or
 "appVersion" >= ($3) and "userInfo_categories" @> ($4) or "event_purchase_lastOccurrence" >= ($5) `;

queryBuilder(queryText, values)
