const pool = require ('./db/index')
const randomData = require('./generate-random-data');

(async () => {
    const client = await pool.connect()
    console.log('connected to db.')

    try {
        const productInfo = randomData()

        function checkExtraKeys(json){
            const {id, product_name, brand, price, image_url, isAvailable, expiration_date,  ...rest} = json
            return rest
        }

        const extraInfo = checkExtraKeys(productInfo)
        const productDetail = [[productInfo['id'], productInfo['product_name'], productInfo['brand'], productInfo['price'], productInfo['image_url'], productInfo['isAvailable'], productInfo['expiration_date'], extraInfo]]

        await client.query('insert into product values($1, $2, $3, $4, $5, $6, $7, $8)', ...productDetail)
        console.log('Data inserted successfully')
    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.release()
        pool.end()
    }
})()