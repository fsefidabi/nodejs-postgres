const queryBuilder = require('../lib/query/query-buider')

const sqlParams = {
  fields: 'count(*)',
  and: [
    { connection: '3G' },
    { event_purchase_count: 1 },
    { '"appVersion"': '1.1.0' },
    { '"event_purchase_firstOccurrence"': '2019-03-18 01:32:39.584+03:30' },
    { tags: '{male}' }
  ],
  or: [
    { '"tokenStatus"': 'ALLOWED' },
    { '"userInfo_categories"': '{golabi}' }
  ]
}

queryBuilder(sqlParams)