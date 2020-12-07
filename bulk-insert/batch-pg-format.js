const batch2 = require('batch2')
const { columns } = require('../library/reusable-variables')
const streamQuery = require('./stream-insert')

const query = `insert into users (${columns}) values %L returning id`
const pipes = [batch2.obj({ size: 100 })]

streamQuery(query, pipes)
