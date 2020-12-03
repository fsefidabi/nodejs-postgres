const { Pool } = require('pg')
const argv = require('./argv')

const pool = new Pool({
  user: argv.user,
  password: argv.password,
  host: argv.host,
  port: argv.port,
  database: argv.db
})

async function connectNewClient () {
  const client = await pool.connect()
  console.log(`connected to ${argv.db} database.`)
  return client
}

module.exports = {
  connect: () => {
    return pool.connect()
  },
  end: () => {
    return pool.end()
  },
  connectNewClient
}
