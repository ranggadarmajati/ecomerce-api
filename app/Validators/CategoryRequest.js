'use strict'

class CategoryRequest {
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
      name: 'required|unique:categories',
      category_pic: 'required|file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image',
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide a name field',
      'name.unique': 'Name already exist!',
      'category_pic.required': 'You must provide a category_pic field'
    }
  }
}

module.exports = CategoryRequest
