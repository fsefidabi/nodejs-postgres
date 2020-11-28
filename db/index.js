const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'person'
})

module.exports = {
    connect: () => {
        return pool.connect()
    },
    end: () => {
        return pool.end()
    }
}
