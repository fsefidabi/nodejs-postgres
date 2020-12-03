const pool = require('./index')
const randomData = require('./library/generate-random-data')
const argv = require('./library/argv')
const checkIfExtraInfoExist = require('./library/find-extra-keys')
const calculateElapsedTime = require('./library/calculate-elapsed-time');

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
      const extraInfo = checkIfExtraInfoExist(productInfo)
      const productDetail = [[productInfo.id, productInfo.product_name, productInfo.brand, productInfo.price, productInfo.image_url, productInfo.isAvailable, extraInfo]]
      await client.query(`insert into ${argv.table} values($1, $2, $3, $4, $5, $6, $7)`, ...productDetail)
    }

    const timeAfterInsertion = Date.now()
    calculateElapsedTime(timeBeforeInsertion, timeAfterInsertion)

    console.log(`${n} rows of data inserted successfully to ${argv.table} table`)
  }
})()
