'use strict'

class FaqRequest {
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
      description: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide a name field',
      'description.required': 'You must provide a description field'
    }
  }
}

module.exports = FaqRequest
