'use strict'
const Faq = use('App/Models/Faq')
const ModelRepository = use('App/Repository/Model')
class FaqController {
    async index({ response }) {
        let faq = new ModelRepository(Faq)
        let data = await faq.showAll()
        return response.Wrapper(200, true, "get Faq data successfully!", data)
    }

    async getQuery({ response, request }) {
        let faq = new ModelRepository(Faq)
        let data = await faq.showQuery(request)
        return response.Wrapper(200, true, "get Faq data successfully!", data)
    }

    async show({ response, params }) {
        const { id } = params
        let faq = new ModelRepository(Faq)
        let data = await faq.showBy('uuid', id)
        if (!data) {
            return response.Wrapper(404, false, "Faq not found!")
        }
        return response.Wrapper(200, true, "Get Faq Data by id successfully!", data)
    }

    async store({ response, request }) {
        let faq = new ModelRepository(Faq)
        let data = await faq.create(request.all())
        if (!data) {
            return response.Wrapper(500, false, "Failed Store Faq data, please try again later!")
        }
        return response.Wrapper(201, true, "Record faq data successfully!", data)
    }

    async update({ response, params, request }) {
        const { id } = params
        let faq = new ModelRepository(Faq)
        let updateRes = await faq.merge(id, request.all())
        if (!updateRes) {
            return response.Wrapper(500, false, "Failed update Faq data, please try again later!")
        }
        return response.Wrapper(200, true, "update faq data successfully!", updateRes)
    }

    async delete({ response, params }) {
        const { id } = params
        const faq = new ModelRepository(Faq)
        let res = await faq.deleteBy('uuid', id)
        if (!res) return response.Wrapper(500, false, "Delete Faq data Failed, please try again later")
        return response.Wrapper(200, true, "Delete Faq data Successfully!")
    }
}

module.exports = FaqController
