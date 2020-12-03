const argv = require('./argv')

function calculateElapsedTime (startTime, endTime) {
  const elapsedTimeInSec = (endTime - startTime) / 1000
  const insertionRatePerSec = argv.number / elapsedTimeInSec
  console.log(`${elapsedTimeInSec} takes long to insert ${argv.number} rows into table.`)
  console.log(`${Math.floor(insertionRatePerSec)} rows can be inserted to table in each second.`)
}

module.exports = calculateElapsedTime
