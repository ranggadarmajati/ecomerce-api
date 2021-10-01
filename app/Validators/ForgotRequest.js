'use strict'

class ForgotRequest {
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
      email: 'required|email'
    }
  }

  get messages() {
    return {
      'email.required': 'You must provide a email field',
      'email.email': 'Invalid email address!'
    }
  }
}

module.exports = ForgotRequest
