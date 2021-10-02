'use strict'
const Color = use('App/Models/Color')
const ModelRepository = use('App/Repository/Model')
class ColorController {
    async index({ response }) {
        let color = new ModelRepository(Color)
        let data = await color.showAll()
        return response.Wrapper(
            200,
            true,
            "Get Color Data Successfully",
            data
        )

    }

    async show({ response, params }) {
        let { id } = params
        let color = new ModelRepository(Color)
        let data = await color.show(id)
        return response.Wrapper(
            200,
            true,
            "Get Color Data By id Successfully",
            data
        )
    }

    async getByQuery({ response, request }) {
        let color = new ModelRepository(Color)
        let data = await color.showQuery(request)
        return response.Wrapper(
            200,
            true,
            'Get Color data successfully!',
            data
        )

    }
}

module.exports = ColorController
