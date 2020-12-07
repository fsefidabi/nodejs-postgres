const { pool } = require('./index');

(async () => {
  try {
    const results = await pool.query(`select count(*) from product`)
    // const results = await client.query(`select product_name, price from product where extra_information -> 'size' ->> 'height' = '70'`)
    console.table(results.rows)
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
})()
