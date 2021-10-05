'use strict'

class AboutUpdateRequest {
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
      content: 'required'
    }
  }

  get messages() {
    return {
      'content.required': 'You must provide a content field'
    }
  }
}

module.exports = AboutUpdateRequest
