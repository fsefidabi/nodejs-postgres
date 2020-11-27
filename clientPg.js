const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'person'
})

// client.connect()
//     .then(_ => {
//         console.log('connected to db.')
//         return client.query('insert into person values ($1, $2, $3, $4, $5, $6)', [10, 'Arghavan', 'Mollazadeh', 'female', '1992-03-25', 'arghmolla@gmil.com'])
//     })
//     .then(_ => client.query('select * from person'))
//     .then(res => console.table(res.rows))
//     .catch(err => console.log(err))
//     .finally(() => client.end())

clientPg()

async function clientPg (){
    try {
        await client.connect()
        console.log('connected to db.')
        const results = await client.query('select * from person')
        console.table(results.rows)
    }
    catch (err) {
        console.log(err)
    }
    finally {
        await client.end()
    }
}