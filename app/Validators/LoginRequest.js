'use strict'

class LoginRequest {
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
      email: 'required',
      password: 'required'
    }
  }

  get messages() {
    return {
      'password.required': 'You must provide a password field',
      'email.required': 'You must provide a email field',
    }
  }
}

module.exports = LoginRequest
