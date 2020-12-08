const config = require('config')
const batchSize = config.get('Batch-flow.size')

const yargs = require('yargs/yargs')(process.argv.slice(2))
  .option('number', {
    alias: 'n',
    describe: 'Number of random data (default value: "1")'
  })
  .option('size', {
    alias: 's',
    describe: 'Batch size in bulk stream-insert'
  })
  .argv

const number = yargs.number || yargs.n || 3
const size = yargs.size || yargs.s || batchSize
module.exports = { number, size }
