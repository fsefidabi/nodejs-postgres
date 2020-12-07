function organizeKeys (json) {
  const { id, product_name, brand, price, image_url, is_available, ...extra_information } = json
  const productDetail = [product_name, brand, price, image_url, is_available, extra_information]
  return productDetail
}

module.exports = organizeKeys
