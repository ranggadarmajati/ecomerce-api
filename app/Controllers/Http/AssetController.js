'use strict'
const Env = use('Env');
const Helpers = use('Helpers')

class AssetController {
    async uploadImages({ response, request, params }) {
        let { directory, filename } = params
        if (request.header("upgrade-insecure-requests")) {
            return response.Wrapper(
                406,
                false,
                'Not Acceptable. please access on web app or mobile app',
                'denied'
            )
        } else {
            return response.download(Helpers.publicPath(`uploads/images/${directory}/${filename}`))
        }
    }

    async js({ response, request, params }) {
        let { filename } = params
        if (request.header("upgrade-insecure-requests")) {
            return response.Wrapper(
                406,
                false,
                'Not Acceptable. please access on web app or mobile app',
                'denied'
            )
        } else {
            return response.download(Helpers.publicPath(`js/${filename}`))
        }
    }

    async css({ response, request, params }) {
        let { filename } = params
        if (request.header("upgrade-insecure-requests")) {
            return response.Wrapper(
                406,
                false,
                'Not Acceptable. please access on web app or mobile app',
                'denied'
            )
        } else {
            return response.download(Helpers.publicPath(`css/${filename}`))
        }
    }

    async fonts({ response, request, params }) {
        let { filename } = params
        if (request.header("upgrade-insecure-requests")) {
            return response.Wrapper(
                406,
                false,
                'Not Acceptable. please access on web app or mobile app',
                'denied'
            )
        } else {
            return response.download(Helpers.publicPath(`fonts/${filename}`))
        }
    }
}

module.exports = AssetController
