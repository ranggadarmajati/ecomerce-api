'use strict'

class ForgotVerification {
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
            verification_code: 'required',
        }
    }

    get messages() {
        return {
            'verification_code.required': 'You must provide a verification_code field'
        }
    }
}

module.exports = ForgotVerification