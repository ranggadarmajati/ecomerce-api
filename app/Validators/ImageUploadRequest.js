'use strict'

class ImageUploadRequest {
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
      product_image: 'required|file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image',
    }
  }

  get messages() {
    return {
      'product_image.required': 'You must provide a product_images field'
    }
  }
}

module.exports = ImageUploadRequest
