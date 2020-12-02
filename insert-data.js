const pool = require('./index')
const randomData = require('./generate-random-data')
const argv = require('./argv');

(async () => {
  const client = await pool.connectNewClient()

  try {
    await insertNewRow (argv.number)
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }

  async function insertNewRow (n) {
    const startTime = Date.now()

    for (let i = 1; i <= n; i++) {
      const productInfo = randomData()

      const extraInfo = checkExtraKeys(productInfo)
      const productDetail = [[productInfo.id, productInfo.product_name, productInfo.brand, productInfo.price, productInfo.image_url, productInfo.isAvailable, productInfo.expiration_date, extraInfo]]

      await client.query(`insert into ${argv.table} values($1, $2, $3, $4, $5, $6, $7, $8)`, ...productDetail)
    }

    const endTime = Date.now()
    calculateUsedTime(startTime, endTime)

    console.log(`${n} rows of data inserted successfully to ${argv.table} table`)
  }

  function checkExtraKeys (json) {
    const { id, product_name, brand, price, image_url, isAvailable, expiration_date, ...rest } = json
    return rest
  }

  function calculateUsedTime (firstTime, secondTime) {
    const usedTime = (secondTime - firstTime) / 1000
    const dataInsertPerSec = argv.number / usedTime
    console.log(`${usedTime} takes long to insert ${argv.number} rows into table.`)
    console.log(`${Math.floor(dataInsertPerSec)} rows can be inserted to table in each second.`)
  }
})()
