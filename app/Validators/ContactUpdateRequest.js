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
      longitude: 'required|float',
      latitude: 'required|float',
      address: 'required',
      email: 'required',
      mobile_phone: 'required|starts_with:62',
      wa_no: 'required|starts_with:62',
      facebook_url: 'required',
      instagram_url: 'required',
      youtube_url: 'required',
      tiktok_url: 'required'
    }
  }
}

module.exports = ContactUpdateRequest
