'use strict'

class BannerRequest {
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
      title: 'required',
      description: 'required',
      link_url: 'required|url',
      position: 'required|integer|under:10|unique:abouts',
      banner_pic: 'required|file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image',
    }
  }

  get messages() {
    return {
      'title.required': 'You must provide a title field',
      'description.required': 'You must provide a description field',
      'link_url.required': 'You must provide a link_url field',
      'link_url.url': 'Invalid url format!',
      'position.required': 'You must provide a position field',
      'banner_pic.required': 'You must provide a banner_pic field'
    }
  }
}

module.exports = BannerRequest
