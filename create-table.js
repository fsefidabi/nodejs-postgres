const pool = require('./index')
const argv = require('./library/argv');

(async () => {
  const client = await pool.connectNewClient()

  try {
    await client.query(
      `create table ${argv.table} (
        id int NOT NULL,
        product_name VARCHAR(50) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        price INT NOT NULL,
        image_url VARCHAR(1000),
        isAvailable BOOLEAN NOT NULL,
        extra_information JSON 
      )`
    )
    console.log(`${argv.table} table created successfully.`)
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
    pool.end()
  }
})()
