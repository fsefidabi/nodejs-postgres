const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'person'
});

(async () => {
    const client = await pool.connect()

    const productInfo = {
        'id': 8,
        'product_name': 'Shampoo',
        'brand': 'Dove',
        'price': '510000',
        'isAvailable': 'true',
        'expiration_date': '2022-12-29',
        'color(s)': ['blue', 'green', 'orange']
    }

    function checkExtraKeys(json){
        const {id, product_name, brand, price, image_url, isAvailable, expiration_date,  ...rest} = json
        return rest
    }

    try {
        const extraInfo = checkExtraKeys(productInfo)
        console.log('connected to db.')
        // await client.query('create table product (id BIGSERIAL NOT NULL PRIMARY KEY, product_name VARCHAR(50) NOT NULL, brand VARCHAR(50) NOT NULL, price INT NOT NULL, image_url VARCHAR(1000), isAvailable BOOLEAN NOT NULL, expiration_date DATE, extra_information JSON)')
        await client.query('insert into product values($1, $2, $3, $4, $5, $6, $7, $8)', [productInfo['id'], productInfo['product_name'], productInfo['brand'], productInfo['price'], productInfo['image_url'], productInfo['isAvailable'], productInfo['expiration_date'], extraInfo])
        const results = await client.query('select * from product')
        console.table(results.rows)
    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.release()
        pool.end()
    }
})()