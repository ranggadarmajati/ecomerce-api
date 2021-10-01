'use strict'

class ResetPasswordRequest {
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
      password: 'required|confirmed|min:6|max:24'
    }
  }

  get messages() {
    return {
      'password.confirmed': 'Password Confirmation not same',
      'password.required': 'You must provide a password field'
    }
  }
}

module.exports = ResetPasswordRequest
