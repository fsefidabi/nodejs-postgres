const pool = require ('./db/index');

(async () => {
    const client = await pool.connect()
    console.log('connected to db.')

    try {
        await client.query(
            `create table testing (
                id BIGSERIAL NOT NULL PRIMARY KEY,
                product_name VARCHAR(50) NOT NULL,
                brand VARCHAR(50) NOT NULL, price INT NOT NULL,
                image_url VARCHAR(1000), isAvailable BOOLEAN NOT NULL,
                expiration_date DATE,
                extra_information JSON 
            )`
        )
        console.log('table created successfully.')
    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.release()
        pool.end()
    }
})()