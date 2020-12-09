const config = require('config')
const tableName = config.get('Device.tableName')
const queryBuilder = require('./testQueryBuilder')

const condition = {
  '"launchCount"': 165,
  connection: 'WiFi',
  '"launchTime"': '2019-05-07',
  tags: ['male'],
  '"deviceModel"': 'Note%'
}

const values = (Object.values(condition));
let queryText = `select count(*) from ${tableName} where "launchCount" > ($1) and connection in ($2) or
 "launchTime" >= ($3) and tags && ($4) or "deviceModel" ($5)`;

queryBuilder(queryText, values)
