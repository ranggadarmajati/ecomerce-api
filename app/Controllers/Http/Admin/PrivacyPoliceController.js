'use strict'
const PrivacyPolice = use('App/Models/PrivacyPolice')
const ModelRepository = use('App/Repository/Model')
class PrivacyPoliceController {
    async index({ response }) {
        let privacy_police = new ModelRepository(PrivacyPolice)
        let data = await privacy_police.showAll()
        return response.Wrapper(200, true, "get Privacy Police successfully!", data)
    }

    async getQuery({ response, request }) {
        let privacy_police = new ModelRepository(PrivacyPolice)
        let data = await privacy_police.showQuery(request)
        return response.Wrapper(200, true, "get Privacy Police successfully!", data)
    }

    async show({ response, params }) {
        const { id } = params
        let privacy_police = new ModelRepository(PrivacyPolice)
        let data = await privacy_police.showBy('uuid', id)
        if(!data) {
            return response.Wrapper( 404, false, "Privacy Police not found!")
        }
        return response.Wrapper( 200, true, "Get Privacy Police Data by id successfully!", data )
    }

    async store({ response, request }) {
        let privacy_police = new ModelRepository(PrivacyPolice)
        let data = await privacy_police.create(request.all())
        if(!data) {
            return response.Wrapper( 500, false, "Failed Store Privacy Police, please try again later!" )
        }
        return response.Wrapper( 201, true, "Record privacy_police data successfully!", data )
    }

    async update({ response, params, request }) {
        const { id } = params
        let privacy_police = new ModelRepository(PrivacyPolice)
        let updateRes = await privacy_police.merge(id, request.all())
        if(!updateRes) {
            return response.Wrapper( 500, false, "Failed update Privacy Police, please try again later!" )
        }
        return response.Wrapper( 200, true, "update privacy_police data successfully!", updateRes )
    }
}

module.exports = PrivacyPoliceController
