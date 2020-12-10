const config = require('config')
const tableName = config.get('Device.tableName')
const queryBuilder = require('./testQueryBuilder')

const condition = {
  '"launchCount"': 165,
  connection: 'WiFi',
  modified: ['2019-05-13', '2019-05-23'],
  tags: '{male}',
  '"deviceModel"': 'Note%'
}

const values = (Object.values(condition).flat());
let queryText = `select count(*) from ${tableName} where "launchCount" > ($1) and connection in ($2) or
 modified between ($3) and ($4) and tags && ($5) or "deviceModel" like ($6)`;

queryBuilder(queryText, values)
