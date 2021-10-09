'use strict'

class AddCategoryProductRequest {
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
      category_id: 'required',
    }
  }

  get messages() {
    return {
      'category_id.required': 'You must provide a category_id field'
    }
  }
}

module.exports = AddCategoryProductRequest
