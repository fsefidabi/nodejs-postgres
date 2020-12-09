function conditionBuilder (queryParams) {
  const conditions = queryParams
  let where = ''
  let j = 0
  for (let i = 0 ; i < Object.keys(conditions).length ; i++) {
    const params = Object.entries(conditions)
    let count = 0
    for (let value of Object.values(params[i][1])){
      j++
      count++
      if (i === Object.keys(conditions).length-1 && count === params[i][1].length){
        where = where + Object.keys(value) + ` in ($${j})`
      } else if (count === params[i][1].length){
        where = where + Object.keys(value) + ` in ($${j}) ` + params[i+1][0] + ' '
      } else {
        where = where + Object.keys(value) + ` in ($${j}) ` + params[i][0] + ' '
      }
    }
  }
  return where
}

function valueBuilder (queryParams) {
  const conditions = queryParams
  let values = []
  for (let i = 0 ; i < Object.keys(conditions).length ; i++) {
    const params = Object.entries(conditions)
    for (let value of Object.values(params[i][1])){
      values.push(Object.values(value))
      values = values.flat()
    }
  }
  return values
}

module.exports = { conditionBuilder , valueBuilder }
