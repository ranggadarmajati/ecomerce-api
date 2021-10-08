'use strict'
const TermsOfus = use('App/Models/TermsOfus')
const ModelRepository = use('App/Repository/Model')
class TermsOfUseController {
    async index({ response }) {
        let terms_of_use = new ModelRepository(TermsOfus)
        let data = await terms_of_use.showAll()
        return response.Wrapper(200, true, "get Terms Of Use data successfully!", data)
    }

    async getQuery({ response, request }) {
        let terms_of_use = new ModelRepository(TermsOfus)
        let data = await terms_of_use.showQuery(request)
        return response.Wrapper(200, true, "get Terms Of Use data successfully!", data)
    }

    async show({ response, params }) {
        const { id } = params
        let terms_of_use = new ModelRepository(TermsOfus)
        let data = await terms_of_use.showBy('uuid', id)
        if(!data) {
            return response.Wrapper( 404, false, "Terms Of Use data not found!")
        }
        return response.Wrapper( 200, true, "Get Terms Of Use data Data by id successfully!", data )
    }

    async store({ response, request }) {
        let terms_of_use = new ModelRepository(TermsOfus)
        let data = await terms_of_use.create(request.all())
        if(!data) {
            return response.Wrapper( 500, false, "Failed Store Terms Of Use data, please try again later!" )
        }
        return response.Wrapper( 201, true, "Record terms_of_use data successfully!", data )
    }

    async update({ response, params, request }) {
        const { id } = params
        let terms_of_use = new ModelRepository(TermsOfus)
        let updateRes = await terms_of_use.merge(id, request.all())
        if(!updateRes) {
            return response.Wrapper( 500, false, "Failed update Terms Of Use data, please try again later!" )
        }
        return response.Wrapper( 200, true, "update terms_of_use data successfully!", updateRes )
    }

    async delete({ response, params }) {
        const { id } = params
        let terms_of_use = new ModelRepository(TermsOfus)
        let res = await terms_of_use.deleteBy('uuid', id)
        if(!res) return response.Wrapper( 500, false, "Delete term of uses failed, please try again later!")
        return response.Wrapper( 200, true, "Delete term of use successfully!" )
    }
}

module.exports = TermsOfUseController
