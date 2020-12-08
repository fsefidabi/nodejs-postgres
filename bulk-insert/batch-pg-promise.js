const { Readable, Writable, pipeline } = require('stream')
const batch2 = require('batch2')
const { pgp, db, cs } = require('../library/pgp-variables')
const { tableName } = require('../library/reusable-variables')
const randomData = require('../library/generate-random-data');

(async () => {
  try {
    await insertNewRows()
  } catch (err) {
    console.log(err)
  }

  calculateInsertionRate()
})()

function insertNewRows () {
  const dataGeneratorStream = new Readable({
    objectMode: true,
    read () {
      const user = randomData()
      this.push(user)
    }
  })

  const writeStreamToTable = new Writable({
    objectMode: true,
    async write (chunk, encoding, callback) {
      await db.none(pgp.helpers.insert(chunk, cs))
      callback()
    }
  })

  pipeline(
    dataGeneratorStream,
    batch2.obj({ size: 500 }),
    writeStreamToTable,
    err => console.log(err)
  )
}

function calculateInsertionRate () {
  let count, oldCount
  db.any(`select count (*) from ${tableName}`)
    .then(data => {
      oldCount = Number(data[0].count)
    })

  setInterval(() => {
    db.any(`select count (*) from ${tableName}`)
      .then(data => {
        count = Number(data[0].count)
        const rate = count - oldCount
        console.log(`Insertion rate: ${rate} rows/sec`)
        oldCount = count
      })
      .catch(err => console.log(err))
  }, 1000)
}
