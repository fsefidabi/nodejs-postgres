const pool = require('./index')
const argv = require('./argv');

(async () => {
  const client = await pool.connect()
  console.log(`connected to ${argv.db} database.`)

  try {
    const results = await client.query(`select * from ${argv.table}`)
    // const results = await client.query(`select product_name, price from ${argv.table} where extra_information -> 'size' ->> 'height' = '70'`)
    console.table(results.rows)
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }
})()
