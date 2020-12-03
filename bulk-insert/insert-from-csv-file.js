const fs = require('fs')
const { pipeline } = require('stream')
const copyFrom = require('pg-copy-streams').from
const pool = require('../index')
const argv = require('../library/argv')
const countRows = require('../library/count-rows');

(async () => {
  const client = await pool.connectNewClient()

  try {
    await insertNewRows()
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }

  async function insertNewRows () {
    await countRows(client)

    const columns = 'id, product_name, brand, price, image_url, isAvailable, extra_information'
    const csvReadStream = fs.createReadStream(`${__dirname}/${argv.fileName}.csv`)
    const writeStreamToTable = await client.query(copyFrom(`copy ${argv.table} (${columns}) from stdin with csv header`))
    pipeline(
      csvReadStream,
      writeStreamToTable,
      err => {
        if (err) console.log(`Pipeline failed. ${err}`)
        else console.log('Data inserted Successfully.')
      }
    )

    await countRows(client)
  }
})()
