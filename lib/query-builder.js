const SqlBuilder = require('./sql-builder')
const { pool } = require('../db/pg')

module.exports = async function queryBuilder (condition) {
  const { queryText, queryValues } = new SqlBuilder(condition).toQuery()
  extractFullQuery(queryText, queryValues)
  try {
    const start = Date.now()
    const results = await pool.query(`${queryText}`, queryValues)
    const end = Date.now()
    const rate = ((end - start) / 1000).toFixed(3)
    console.log(`rate of SELECT query: ${rate} s`)
    console.log(results.rows)
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
}

function extractFullQuery (query, values) {
  for (let i = 0; i < values.length; i++) {
    query = query.replace(`($${i + 1})`, values[i])
  }
  console.log(query)
}
