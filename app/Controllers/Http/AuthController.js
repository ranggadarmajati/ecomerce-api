'use strict'
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const UserVerification = use('App/Models/UserVerification')
const HelperCrypto = use('HelperCrypto')
class AuthController {
    async login({ auth, request, response }) {
        const { email, password } = request.all()
        const checkUser = await User.findBy('email', email)
        if (checkUser) {
            let userVerification = await UserVerification.findBy('user_id', checkUser.id)
            if (userVerification) {
                return response.Wrapper(
                    404,
                    false,
                    'Please check your email to activation your account!',
                    {}
                )
            } else {
                try {
                    const checkAuth = await auth.attempt(email, password)
                    let user_role = await checkUser.user_roles().fetch()
                    let role = await Role.findBy('id', user_role.role_id)
                    let auth_data = {
                        id: checkUser.id,
                        uuid: checkUser.uuid,
                        name: checkUser.name,
                        email: checkUser.email,
                        mobile_phone: checkUser.mobile_phone,
                        role: role.name,
                        initial_role: role.initial,
                        token: checkAuth.token,
                        type: checkAuth.type
                    }

                    let data_string = JSON.stringify(auth_data)
                    let res = {
                        data: await HelperCrypto.Encrypt(data_string)
                    }
                    
                    return response.Wrapper(
                        200,
                        true,
                        'Login successfully!',
                        res
                    )
                } catch (error) {
                    console.log(error)
                    return response.Wrapper(
                        404,
                        false,
                        error.message,
                        error
                    )
                }
            }
        } else {
            return response.Wrapper(
                404,
                false,
                "The email address not registered!",
                {}
            )
        }
    }
}

module.exports = AuthController
