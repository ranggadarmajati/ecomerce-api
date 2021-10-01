'use strict'
const Env = use('Env')
const Hash = use('Hash')
const Event = use('Event')
const Database = use('Database')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const UserRole = use('App/Models/UserRole')
const UserVerification = use('App/Models/UserVerification')
const HelperCrypto = use('HelperCrypto')
const Generate = use('Generate')
const UserToken = use('App/Models/Token')
const Utils = use('App/Helper/Utils')
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

                    let forLog = await HelperCrypto.Decrypt(res.data);
                    console.log(JSON.parse(forLog))

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

    async logout({ auth, response }) {
        const apiToken = auth.getAuthHeader()
        await auth
            .authenticator('api')
            .revokeTokens([apiToken])
        return response.Wrapper(
            200,
            true,
            "Logout successfully",
            {}
        )
    }

    async profile({ auth, response }) {
        let user = await auth.getUser()
        let user_role = await user.user_roles().fetch()
        let role = await Role.findBy('id', user_role.role_id)
        let auth_data = {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            mobile_phone: user.mobile_phone,
            role: role.name,
            initial_role: role.initial
        }
        return response.Wrapper(
            200,
            true,
            "Get Profile Successfully!",
            auth_data
        )
    }

    async register({ request, response }) {
        let { name, mobile_phone, email, password } = request.all()
        const trx = await Database.beginTransaction()
        let role = await Role.findBy('initial', 'c')
        try {
            const user = new User()
            user.name = name
            user.mobile_phone = mobile_phone.toString().substring(0, 1) === '0' ? Utils.replacePhoneNumber(mobile_phone) : mobile_phone
            user.email = email
            user.password = password
            await user.save(trx)
            const user_role = new UserRole()
            user_role.role_id = role.id
            await user.user_roles().save(user_role, trx)

            let activationKey = Generate.activationKey()
            let urlActivation = `${Env.get('APP_URL')}/api/v1/auth/activation/${activationKey}`
            let userDataObject = {
                name: name,
                email: email,
                activationKey,
                URI_ACTIVATION: urlActivation,
                subject_email: 'Email Verification'
            }
            Event.fire('new::user', userDataObject)
            const user_verification = new UserVerification()
            user_verification.token = activationKey
            await user.user_verifications().save(user_verification, trx)
            await trx.commit()

            return response.Wrapper(
                201,
                true,
                'Register Successfully, Please check your email to verifications!'
            )
        } catch (error) {
            console.log('error register :', error)
            await trx.rollback()
            return response.Wrapper(
                500,
                false,
                error.message
            )
        }
    }

    async activation({ response, params, view }) {
        let { activationKey } = params
        let userVerification = await UserVerification.findBy('token', activationKey)
        if (userVerification) {
            const trx = await Database.beginTransaction()
            try {
                await userVerification.delete(trx)
                await trx.commit()
                return view.render('commons.activation', { url_web: Env.get('FRONTEND_URL', 'http://localhost:3000') })
            } catch (error) {
                await trx.rollback()
                return response.Wrapper(
                    500,
                    false,
                    error.message
                )
            }
        } else {
            return response.Wrapper(
                404,
                false,
                'Invalid Activation key!'
            )
        }
    }

    async forgotPasword({ request, response }) {
        const { email } = request.all()
        let user = await User.findBy('email', email)
        if (!user) {
            return response.Wrapper(
                404,
                false,
                "Email address not found!"
            )
        }
        const token = Generate.numericGenerate();
        const trx = await Database.beginTransaction();
        try {
            let userToken = new UserToken()
            userToken.user_id = user.id
            userToken.token = token
            userToken.type = 'forgot_password_token'
            userToken.is_revoked = false
            await userToken.save(trx)
            await trx.commit()
            let userDataObject = {
                fullname: user.name,
                email: user.email,
                forgot_password_token: token,
                subject_email: 'Forgot Password | Verification Code: ' + token
            }
            Event.fire('forgot_password::user', userDataObject)
            return response.Wrapper(
                200,
                true,
                `Verify code has been send to your email address!`
            )
        } catch (error) {
            console.log("forgotPassword: ", error)
            await trx.rollback()
            return response.Wrapper(
                500,
                false,
                error.message
            )
        }
    }

    async forgotVerification({ request, response }) {
        const { verification_code } = request.all();
        const userToken = await UserToken.findBy('token', verification_code)
        if (!userToken) {
            return response.Wrapper(
                404,
                false,
                'Invalid verification code!'
            )
        } else {
            const user = await User.find(userToken.user_id)
            const tokenHash = await Hash.make(user.email)
            const uuid = user.uuid
            let res = {
                url: `${Env.get('APP_URL')}/api/v1/auth/reset/${uuid}/password/?token=${tokenHash}`,
                method: 'POST',
                body: {
                    password: 'your_password',
                    password_confirmation: 'your_password'
                }
            }
            await userToken.delete()
            return response.Wrapper(
                200,
                true,
                'Verification code is valid!',
                res
            )
        }
    }

    async resetPassword({ request, params, response }) {
        let { uuid } = params
        let { token, password } = request.all()
        let user = await User.findBy('uuid', uuid)
        if (!user) {
            return response.Wrapper(
                404,
                false,
                'User not found!'
            )
        }
        const check = await Hash.verify(user.email, token)
        if (!check) {
            return response.Wrapper(
                404,
                false,
                'token do not match!'
            )
        }
        const trx = await Database.beginTransaction()
        try {
            user.password = password
            await user.save(trx)
            await trx.commit()
            return response.Wrapper(
                200,
                true,
                'Reset Password Successfully!'
            )
        } catch (error) {
            console.log('error resetPasswod', error)
            await trx.rollback()
            return response.Wrapper(
                500,
                false,
                'Internal server error, please try again later!'
            )
        }
    }
}

module.exports = AuthController
