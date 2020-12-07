async function calculateTime (connection) {
  const query = `select count (*) from users`

  let count = 0
  let oldCount = await connection.query(query)
  oldCount = Number(oldCount.rows[0].count)

  setInterval(async () => {
    count = await connection.query(query)
    count = Number(count.rows[0].count)
    const rate = count - oldCount
    console.log(`Insertion rate: ${rate} rows/sec`)
    oldCount = count
  }, 1000)
}

module.exports = calculateTime
