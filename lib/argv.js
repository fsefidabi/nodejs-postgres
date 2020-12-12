const config = require('config')
const batchSize = config.get('bulkFlow.size')
const tableName = config.get('device.tableName')

const yargs = require('yargs/yargs')(process.argv.slice(2))
  .option('table', {
    alias: 't',
    describe: 'Table name'
  })
  .option('bs', {
    alias: 'b',
    describe: 'Batch size in bulk bulk-insert'
  })
  .option('number', {
    alias: 'n',
    describe: 'Number of inserting rows'
  })
  .argv

const table = yargs.table || yargs.t || tableName
const batch = yargs.bs || yargs.b || batchSize
const numberOfRows = yargs.number || yargs.n || 10000000
module.exports = { table, batch, numberOfRows }
