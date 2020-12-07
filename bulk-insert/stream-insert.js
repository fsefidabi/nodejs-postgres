const { Readable, Writable, pipeline } = require('stream')
const format = require('pg-format')
const { pool } = require('../index')
const randomData = require('../library/generate-random-data')
const calculateTime = require('../library/calculate-elapsed-time')

async function streamQuery (query, pipes = []) {
  try {
    await insertNewRows()
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }

  async function insertNewRows () {
    const dataGeneratorStream = new Readable({
      objectMode: true,
      read () {
        const user = randomData()
        const newUser = Object.values(user)
        this.push(newUser)
      }
    })

    const writeStreamToTable = new Writable({
      objectMode: true,
      async write (chunk, encoding, callback) {
        if (chunk.length <= 25) {
          await pool.query(query, chunk)
        } else {
          await pool.query(format(query, chunk))
        }
        callback()
      }
    })

    await calculateTime(pool)

    return new Promise((resolve, reject) => {
      pipeline(
        dataGeneratorStream,
        ...pipes,
        writeStreamToTable,
        err => console.error(err)
      )
    }).catch(err => console.log(err))
  }
}

module.exports = streamQuery
