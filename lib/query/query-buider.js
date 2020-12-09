const config = require('config')
const { pool } = require('../../db/index')
const { conditionBuilder, valueBuilder } = require('./condition-builder');

const tableName = config.get('Device.tableName')

module.exports = async function queryBuilder (options) {
  if (!options['from']) {
    options = { from: tableName, ...options }
  }

  if (!options['fields']) {
    options = { fields: 'count(*)', ...options }
  }

  const { from, fields, ...conditions } = options
  const test = conditionBuilder(conditions)
  const value = valueBuilder(conditions);
  let queryText = `select ${fields} from ${from} where ${test}`
  try {
    const query = await pool.query(`${queryText}`, value)
    console.table(query.rows)
  } catch (err) {
    console.log(err)
  } finally {
    pool.end()
  }
}
