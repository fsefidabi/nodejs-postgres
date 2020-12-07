const yargs = require('yargs/yargs')(process.argv.slice(2))
  .option('number', {
    alias: 'n',
    describe: 'Number of random data (default value: "1")'
  })
  .argv

const number = yargs.number || yargs.n || 3

module.exports = { number }
