const pool = require('./index')
const argv = require('./argv');

(async () => {
  const client = await pool.connect()
  console.log(`connected to ${argv.db} database.`)

  try {
    await client.query(
      `create table ${argv.table} (
        id int NOT NULL PRIMARY KEY,
        product_name VARCHAR(50) NOT NULL,
        brand VARCHAR(50) NOT NULL, price INT NOT NULL,
        image_url VARCHAR(1000), isAvailable BOOLEAN NOT NULL,
        expiration_date DATE,
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
