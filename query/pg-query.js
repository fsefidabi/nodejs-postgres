const queryBuilder = require('../lib/postgres/pg-query-builder')

const condition = {
  from: "devices",
  where: {
    osVersion: { $like: '1.1.%' },
    launchCount: 90,
    $or: {
      launchTime: ['2019-05-05', '2019-05-25'],
      userInfo_categories: { $has: '{apple}' }
    }
  }
}

queryBuilder(condition)
