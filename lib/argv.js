const config = require('config')
const batchSize = config.get('Batch-flow.size')

const yargs = require('yargs/yargs')(process.argv.slice(2))
  .option('size', {
    alias: 's',
    describe: 'Batch size in bulk stream-insert'
  })
  .argv

const size = yargs.size || yargs.s || batchSize
module.exports = size
