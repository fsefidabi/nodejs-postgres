const _ = require('lodash')
const { tableName } = require('./argv')

function SqlBuilder (options) {
  if (!new.target) {
    return new SqlBuilder(options)
  }

  if (!options['from']) {
    options = { from: `${tableName}`, ...options }
  }

  if (!options['fields']) {
    options = { fields: 'count(*)', ...options }
  }

  if (typeof options['fields'] === 'string') {
    options['fields'] = options['fields'].split(',')
  }

  if (!options['where']) {
    options = { where: [], ...options }
  }

  const { from, fields, where } = options
  this.from = `"${from}"`
  this.fields = fields.map(field => field === 'count(*)' ? field : `"${field}"`)
  this.where = where
  this.i = 1
  this.values = []
}

SqlBuilder.prototype.toQuery = function () {
  let finalWhereConditions = ''
  if (this.where.length === 0) {
    finalWhereConditions = ''
  } else {
    const conditions = this.whereBuilder(this.where, [])
    finalWhereConditions += `${conditions}`
  }
  const queryValues = this.values.flat()
  const queryText = `select ${this.fields.join(', ')} from ${this.from} where ${finalWhereConditions}`
  console.log(queryText)
  return { queryText, queryValues }
}

SqlBuilder.prototype.whereBuilder = function (where, conditions) {
  const andConditions = []
  const orConditions = []
  const TRANSLATE_TO_SQL = {
    $eq: { sqlValue: '=' },
    $gt: { sqlValue: '>' },
    $gte: { sqlValue: '>=' },
    $lt: { sqlValue: '<' },
    $lte: { sqlValue: '<=' },
    $in: { sqlValue: 'in' },
    $any: { sqlValue: 'any' },
    $like: { sqlValue: 'like' },
    $has: { sqlValue: '&&' }
  }

  const OPERATORS = ['$and', '$or', ...Object.keys(TRANSLATE_TO_SQL)]
  Object.keys(where).map(key => {
    const value = where[key]
    const lowerCaseKey = key.toLowerCase()
    if (OPERATORS.includes(lowerCaseKey)) {
      if (lowerCaseKey === '$and') {
        const and = this.whereBuilder(value, andConditions)
        andConditions.push(and)
      } else {
        const or = this.whereBuilder(value, orConditions)
        orConditions.push(`(${or})`)
      }
    } else {
      if (_.isPlainObject(value)) {
        const MONGO_OPERATOR = Object.keys(value)
        this.values.push(Object.values(value))
        andConditions.push(`("${key}" ${TRANSLATE_TO_SQL[MONGO_OPERATOR].sqlValue} ($${this.i}))`)
      } else if (Array.isArray(value)) {
        this.values.push(value)
        andConditions.push(`("${key}" between ($${this.i}) and ($${++this.i}))`)
      } else {
        this.values.push(value)
        andConditions.push(`("${key}" = ($${this.i}))`)
      }
      this.i++
    }
  })
  const andPhrase = [...andConditions].join(' and ')
  const orPhrase = [...orConditions].join(' and ')
  if (orPhrase.length !== 0) {
    conditions = [andPhrase, orPhrase].join(' or ')
  } else {
    conditions = andPhrase
  }
  return conditions
}

module.exports = SqlBuilder
