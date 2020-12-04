const yargs = require('yargs/yargs')(process.argv.slice(2))
  .option('user', {
    alias: 'u',
    describe: 'Postgres username (default value: "postgres")'
  })
  .option('password', {
    alias: 'p',
    describe: 'Postgres password (default value: "postgres")'
  })
  .option('host', {
    alias: 'h',
    describe: 'Postgres host address (default value: "localhost")'
  })
  .option('port', {
    alias: 'p',
    describe: 'Postgres port number (default value: "5432")'
  })
  .option('db', {
    alias: 'd',
    describe: 'Database name (default value: "test")'
  })
  .option('table', {
    alias: 't',
    describe: 'Table name (default value: "product")'
  })
  .option('number', {
    alias: 'n',
    describe: 'Number of random data (default value: "1")'
  })
  .option('file', {
    alias: 'f',
    describe: 'name of the .CSV file (default value: "sample")'
  })
  .argv

const user = yargs.user || yargs.u || 'postgres'
const password = yargs.password || yargs.p || 'postgres'
const host = yargs.host || yargs.h || 'localhost'
const port = yargs.port || yargs.p || 5432
const db = yargs.db || yargs.d || 'test'
const table = yargs.table || yargs.t || 'product'
const number = yargs.number || yargs.n || 3
const fileName = yargs.file || yargs.f || 'sample'

module.exports = { user, password, host, port, db, table, number, fileName }
