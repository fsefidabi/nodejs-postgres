const { pool } = require('./index')
const randomData = require('./library/generate-random-data')
const argv = require('./library/argv')
const { columns } = require('./library/reusable-variables');

(async () => {
  try {
    await insertNewRows(argv.number)
  } catch (err) {
    console.log(err)
  } finally {
    await pool.end()
  }

  async function insertNewRows (n) {
    const timeBeforeInsertion = Date.now()

    for (let i = 1; i <= n; i++) {
      const user = randomData()
      const newUser = Object.values(user)
      await pool.query(`insert into users (${columns}) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
        returning id`, newUser)
    }

    const timeAfterInsertion = Date.now()
    calculateElapsedTime(timeBeforeInsertion, timeAfterInsertion)

    console.log(`${n} rows inserted successfully to users table`)
  }
})()

function calculateElapsedTime (startTime, endTime) {
  const elapsedTimeInSec = (endTime - startTime) / 1000
  const rate = argv.number / elapsedTimeInSec
  console.log(`Insertion rate: ${Math.floor(rate)} rows/sec`)
}
