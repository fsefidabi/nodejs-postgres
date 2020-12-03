const pool = require('./index')
const randomData = require('./generate-random-data')
const argv = require('./argv');

(async () => {
  const client = await pool.connectNewClient()

  try {
    await insertNewRows(argv.number)
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }

  async function insertNewRows (n) {
    const timeBeforeInsertion = Date.now()

    for (let i = 1; i <= n; i++) {
      const productInfo = randomData()

      const extraInfo = checkIfExtraKeyExist(productInfo)
      const productDetail = [[productInfo.id, productInfo.product_name, productInfo.brand, productInfo.price, productInfo.image_url, productInfo.isAvailable, productInfo.expiration_date, extraInfo]]
      console.log(productDetail)
      await client.query(`insert into ${argv.table} values($1, $2, $3, $4, $5, $6, $7, $8)`, ...productDetail)
    }

    const timeAfterInsertion = Date.now()
    calculateElapsedTime(timeBeforeInsertion, timeAfterInsertion)

    console.log(`${n} rows of data inserted successfully to ${argv.table} table`)
  }

  function checkIfExtraKeyExist (json) {
    const { id, product_name, brand, price, image_url, isAvailable, expiration_date, ...rest } = json
    if (Object.keys(rest).length !== 0) {
      return rest
    }
  }

  function calculateElapsedTime (startTime, endTime) {
    const elapsedTimeInSec = (endTime - startTime) / 1000
    const insertionRatePerSec = argv.number / elapsedTimeInSec
    console.log(`${elapsedTimeInSec} takes long to insert ${argv.number} rows into table.`)
    console.log(`${Math.floor(insertionRatePerSec)} rows can be inserted to table in each second.`)
  }
})()
