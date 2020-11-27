const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'person'
})

// pool.connect()
//     .then(client => {
//         return client
//             .query('select * from person')
//             .then(res => {
//                 client.release()
//                 console.table(res.rows)
//             })
//     })
//     .catch(err => console.log(err))
//     .finally(() => pool.end())

poolPg()

async function poolPg() {
    try {
        const client = await pool.connect()
        console.log('connected to db')
        const { rows } = await client.query('select first_name, last_name, email from person')
        console.table(rows)
        client.release()
    }
    catch (err) {
        console.log(err)
    }
    finally {
        await pool.end()
    }
}