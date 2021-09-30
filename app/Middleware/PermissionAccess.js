'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Role = use('App/Models/Role')

class PermissionAccess {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ auth, response }, next, schemes) {
        const { id } = await auth.getUser()
        let user = await User.find(id)
        let user_role = await user.user_roles().fetch()
        let role = await Role.find(user_role.role_id)
        let check = schemes.filter(function (a) {
            return a == role.initial
        })
        if (check.length == 0) {
            return response.Wrapper(
                403,
                false,
                'the user with level ' + role.name + ' can`t access this url'
            )
        }
        await next()
    }
}

module.exports = PermissionAccess
