const pool = require ('./db/index');

(async () => {
    const client = await pool.connect()
    console.log('connected to db.')

    try {
        const results = await client.query("select * from product")
        // const results = await client.query("select product_name, price from product where extra_information -> 'size' ->> 'height' = '70'")
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