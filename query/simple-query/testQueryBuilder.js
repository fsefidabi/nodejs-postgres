const { pool } = require('../../db')

module.exports = async function queryBuilder (queryText, values)  {
  try {
    const query = await pool.query(`${queryText}`, values)
    console.table(query.rows)
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
}