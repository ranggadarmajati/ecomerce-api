'use strict'

class RegisterRequest {
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
      mobile_phone: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed|min:6|max:24'
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide a name field',
      'mobile_phone.required': 'You must provide a mobile_phone field',
      'mobile_phone.unique': 'Mobile phone already registered!',
      'email.required': 'You must provide a email field',
      'email.email': 'Invalid email address',
      'email.unique': 'Email already registered!',
      'password.confirmed': 'Password Confirmation not same',
      'password.required': 'You must provide a password field'
    }
  }
}

module.exports = RegisterRequest
