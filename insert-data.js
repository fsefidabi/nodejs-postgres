const pool = require('./index')
const randomData = require('./generate-random-data')
const argv = require('./argv');

(async () => {
  const client = await pool.connect()
  console.log(` connected to ${argv.db} database.`)

  try {
    await test(argv.number)
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }

  async function test (n) {
    for (let i = 1; i <= n; i++) {
      const productInfo = randomData()

      const extraInfo = checkExtraKeys(productInfo)
      const productDetail = [[productInfo.id, productInfo.product_name, productInfo.brand, productInfo.price, productInfo.image_url, productInfo.isAvailable, productInfo.expiration_date, extraInfo]]

      await client.query(`insert into ${argv.table} values($1, $2, $3, $4, $5, $6, $7, $8)`, ...productDetail)
    }
    console.log(`${n} rows of data inserted successfully to ${argv.table} table`)
  }

  function checkExtraKeys (json) {
    const { id, product_name, brand, price, image_url, isAvailable, expiration_date, ...rest } = json
    return rest
  }
})()
