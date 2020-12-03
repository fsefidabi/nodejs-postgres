function checkIfExtraInfoExist (json) {
  const { id, product_name, brand, price, image_url, isAvailable, ...rest } = json
  if (Object.keys(rest).length !== 0) {
    return rest
  }
}

module.exports = checkIfExtraInfoExist
