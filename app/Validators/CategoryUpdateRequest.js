'use strict'

class CategoryUpdateRequest {
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
      name: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide a name field'
    }
  }
}

module.exports = CategoryUpdateRequest
