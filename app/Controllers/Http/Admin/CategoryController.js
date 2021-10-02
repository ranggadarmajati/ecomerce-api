'use strict'
const Category = use('App/Models/Category')
const ModelRepository = use('App/Repository/Model')

class CategoryController {

    async index({ response }) {
        let category = new ModelRepository(Category)
        let data = await category.showAll()
        return response.Wrapper(
            200,
            true,
            "Success get category!",
            data
        )
    }

    async getByQuery({ response, request }) {
        let category = new ModelRepository(Category)
        let data = await category.showQuery(request)
        return response.Wrapper(
            200,
            true,
            'Get category data successfully!',
            data
        )
    }

    async show({ response, params }) {
        let { id } = params
        let category = new ModelRepository(Category)
        let data = await category.show(id)
        return response.Wrapper(
            200,
            true,
            "Get Color Data By id Successfully",
            data
        )
    }
}

module.exports = CategoryController
