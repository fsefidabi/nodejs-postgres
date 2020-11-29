const { Pool } = require('pg')
const argv = require('./argv')

const pool = new Pool({
  user: argv.user,
  password: argv.password,
  host: argv.host,
  port: argv.port,
  database: argv.db
})

module.exports = {
  connect: () => {
    return pool.connect()
  },
  end: () => {
    return pool.end()
  }
}
