'use strict'

class ProductRequest {
  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.Wrapper(
      400,
      false,
      "Bad request!",
      errorMessages
    )
  }

  get rules() {
    return {
      name: 'required',
      description: 'required',
      gender: 'required|in:male,female,unisex',
      capital_price: 'required|integer',
      selling_price: 'required|integer',
      stock: 'integer',
      point: 'integer',
      label: 'required|in:new,favorite,best_seller',
      product_categories: 'required|array|min:1',
      product_sizes: 'required|array|min:1',
      'product_sizes.*.name': 'required|in:S,M,L,XL,XXL',
      'product_sizes.*.additional_price': 'integer',
      'product_sizes.*.additional_capital_price': 'integer',
      product_colors: 'required|array|min:1',
      'product_colors.*.color_id': 'required|integer',
      'product_colors.*.additional_price': 'integer',
      'product_colors.*.additional_capital_price': 'integer',
      weight: 'required|integer',
      length: 'integer',
      width: 'integer',
      product_images: 'required|array|file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image',
    }
  }
}

module.exports = ProductRequest
