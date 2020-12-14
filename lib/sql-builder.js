const _ = require('lodash')
function sqlBuilder (options) {
  if (!options['from']) {
    options = { from: 'testing', ...options }
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
  this.from = from
  this.fields = fields
  this.where = where

  this.from = checkCamelCaseNames(this.from)
  this.fields = this.fields.map(field => checkCamelCaseNames(field))
  this.queryBuilder()
}

sqlBuilder.prototype.queryBuilder = function () {
  let whereConditions
  if (this.where.length === 0) {
    whereConditions = ""
  } else {
    const conditions = this.whereBuilder()
    whereConditions = `WHERE ${conditions}`
  }
  const queryText = `SELECT ${this.fields.join(', ')} FROM ${this.from} ${whereConditions}`
  return queryText
}

sqlBuilder.prototype.whereBuilder = function () {
  const logicalOperator = ['AND', 'OR', 'and', 'or']
  const arithmeticOperator = ['=', '>', '<', '>=', '<=', 'IN', 'LIKE', 'in', 'like']
  const noOperator = []
  let verifiedConditions = []

  this.where.map(state => {
    if (_.intersection(Object.keys(state), logicalOperator).length < 1) {
      noOperator.push(state)
    } else {
      verifiedConditions.push(state)
    }
  })

  if (noOperator.length !== 0) {
    verifiedConditions.push(JSON.parse(JSON.stringify({'and': noOperator})))
  }

  let query = ''
  let i = 1
  verifiedConditions.map(state => {
    const operator = Object.keys(state)[0].toUpperCase()
    const conditions = Object.values(state).flat()
    conditions.map(condition => {
      query += `${operator} ${Object.keys(condition)} in $(${i}) `
      i++
    })
  })

  query = query.replace('AND', '')
  return query
}

function checkCamelCaseNames (name) {
  if(/[A-Z]/.test(name)) {
    name = `"${name}"`
  }
  return name
}

const sqlParams = {
  fields: 'count(*)',
  from: 'devices',
  where: [
    {
      and: [
        { connection: { gt: '3G' } },
        { event_purchase_count: { '>': 1 } },
        { '"appVersion"': '1.1.0' }
      ]
    },
    { '"launchTime"': ['2019-05-05', '2019-05-07'] },
    { tags: '{male}' }
    ,
    { or: [
        { '"tokenStatus"': 'ALLOWED' },
        { '"userInfo_categories"': '{golabi}' }
      ]
    }
  ]
}

const query = new sqlBuilder(sqlParams).queryBuilder()
console.log(query)
