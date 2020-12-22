const test = require('ava')
const SqlBuilder = require('./lib/sql-builder')

test('should convert mongo-style object to SQL queries.', t => {
  t.is(query1, `select count(*) from "devices" where ("tags" = ($1)) and ("launchCount" > ($2)) and ("deviceModel" in ($3))`)
  t.is(query2, `select count(*) from "devices" where ("launchTime" = ($1)) and ("launchCount" < ($2)) or (("deviceModel" in ($3)) and ("appId" = ($4)))`)
  t.is(query3, `select "id", "launchCount" from "devices" where ("launchCount" = ($1)) and ("osVersion" like ($2)) and ("launchCount" = ($3)) or (("userInfo_categories" && ($4)))`)
})

const condition1 = {
  fields: 'count(*)',
  from: 'devices',
  where: {
    tags: 12,
    launchCount: { $gt: 50 },
    $and: { deviceModel: { $in: 'Note%' } }
  }
}

const condition2 = {
  where: {
    $and: { launchTime: '2019-05-05', launchCount: { $lt: 50 } },
    $or: { deviceModel: { $in: 'Note%' }, appId: 'appId' }
  }
}

const condition3 = {
  fields: ['id', 'launchCount'],
  where: {
    launchCount: { $eq: 146 },
    $and: { osVersion: { $like: '1.1.' }, launchCount: 50 },
    $or: { userInfo_categories: { $has: "['apple']" } }
  }
}

const query1 = SqlBuilder(condition1).toQuery().queryText
const query2 = new SqlBuilder(condition2).toQuery().queryText
const query3 = new SqlBuilder(condition3).toQuery().queryText
