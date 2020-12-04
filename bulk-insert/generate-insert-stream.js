const { Readable, Writable, pipeline } = require('stream')
const pool = require('../index')
const argv = require('../library/argv')
const randomData = require('../library/generate-random-data')
const checkIfExtraInfoExist = require('../library/find-extra-keys')
const countRows = require('../library/count-rows');

(async () => {
  const client = await pool.connectNewClient()

  try {
    await insertNewRows()
  } catch (err) {
    console.log(err)
  }

  async function insertNewRows () {
    const dataGeneratorStream = new Readable({
      objectMode: true,
      read () {
        const newData = randomData()
        this.push(newData)
      }
    })

    const writeStreamToTable = new Writable({
      objectMode: true,
      async write (chunk, encoding, callback) {
        const extraInfo = checkIfExtraInfoExist(chunk)
        const productDetail = [[chunk.id, chunk.product_name, chunk.brand, chunk.price, chunk.image_url, chunk.isAvailable, extraInfo]]
        await client.query(`insert into ${argv.table} values($1, $2, $3, $4, $5, $6, $7)`, ...productDetail)
        callback()
      }
    })

    pipeline(
      dataGeneratorStream,
      writeStreamToTable,
      err => console.log(err)
    )

    setInterval(async () => {
      await countRows(client)
    }, 1000)
  }
})()
