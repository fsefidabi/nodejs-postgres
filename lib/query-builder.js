const { pool } = require('../db')

module.exports = async function queryBuilder (query, values) {
  extractFullQuery(query, values)
  try {
    const start = Date.now()
    const results = await pool.query(`${query}`, values)
    const end = Date.now()
    const rate = ((end - start) / 1000).toFixed(3)
    console.log(`rate of SELECT query: ${rate} s`)
    console.log(results)
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
}

function extractFullQuery(query, values) {
  for (let i = 0 ; i < values.length ; i++) {
    query = query.replace(`($${i+1})`, values[i])
  }
  console.log(query)
}
