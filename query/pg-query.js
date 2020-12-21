process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/"
const queryBuilder = require('../lib/postgres/query-builder')
const { table } = require('../lib/argv')

const condition = {
  tags: '{male}',
  '"launchTime"': ['2019-05-05', '2019-05-07'],
  '"launchCount"': 50,
  '"deviceModel"': 'Note%'
}

const values = (Object.values(condition).flat())
const pgQuery = `explain analyze select * from ${table} where tags && ($1) and "launchTime" between ($2) and ($3) and "launchCount" < ($4)
  and "deviceModel" like ($5)`

queryBuilder(pgQuery, values)
