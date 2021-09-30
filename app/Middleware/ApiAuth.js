'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ApiAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const apiToken = auth.getAuthHeader()
    if (apiToken) {
      let check
      try { check = await auth.check() } catch (error) { check = false }
      if (!check) { return response.Wrapper(401, false, "Invalid Token Api!", {}) } else { await next() }
    } else {
      return response.Wrapper(401, false, "Token Api is missing!", {})
    }
  }
}

module.exports = ApiAuth
