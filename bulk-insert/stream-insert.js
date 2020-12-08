const { Readable, Writable, pipeline } = require('stream')
const format = require('pg-format')
const { pool, createTable } = require('../index')
const randomData = require('../library/generate-random-data')
const calculateTime = require('../library/calculate-elapsed-time')

async function streamQuery (query, pipes = []) {
  try {
    await createTable()
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
        const chunkLength = calculateChunkLength()
        if (chunk.length === chunkLength) {
          await pool.query(query, chunk)
        } else {
          const flattedChunk = chunk.map(data => data.map(col => {
            if (col instanceof Array) {
              col = `${col}`
            }
            return col
          }))
          await pool.query(format(query, flattedChunk))
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

function calculateChunkLength () {
  const sampleData = randomData()
  const chunkLength = Object.keys(sampleData).length
  return chunkLength
}

module.exports = streamQuery
