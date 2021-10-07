'use strict'

class ContactUpdateRequest {
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
      longitude: 'number',
      latitude: 'number',
      address: 'required',
      email: 'required|email',
      mobile_phone: 'required|starts_with:62',
      wa_no: 'required|starts_with:62',
      facebook_url: 'required',
      instagram_url: 'required',
      youtube_url: 'required',
      tiktok_url: 'required'
    }
  }

  get messages() {
    return {
      'mobile_phone.starts_with': 'mobile_phone must be start with 62',
      'wa_no.starts_with': 'wa_no must be start with 62',
      'email.email': 'invalid email format'
    }
  }
}

module.exports = ContactUpdateRequest
