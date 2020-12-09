const builder = require('mongo-sql')

const sqlParams = {
  type: 'select',
  table: 'users',
  where: {
    $and: [
      { connection: '3G' },
      { event_purchase_count: 2 }
    ],
    $or: [
      { tags: '{male,vip,L1}' },
      { '"tokenStatus"': 'ALLOWED' },
      { '"userInfo_categories"': '{golabi}' }
    ]
  }
}

const result = builder.sql(sqlParams)

     // Array of values
console.log(result.toString()) // Sql string value
console.log(result.values)
