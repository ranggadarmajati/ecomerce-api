'use strict'
const Database = use('Database')
const Helpers = use('Helpers')
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
        let data = await category.showBy('uuid', id)
        return response.Wrapper(
            200,
            true,
            "Get Color Data By id Successfully",
            data
        )
    }

    async store({ response, request }) {
        const { name } = request.all()
        let slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const categoryPic = request.file('category_pic', {
            types: ['image'],
            size: '5mb',
            extnames: ['png', 'jpg', 'jpeg']
        });
        let extension = categoryPic.extname
        let filename = `${slug}.${extension}`;
        await categoryPic.move(Helpers.publicPath('uploads/images/category'), {
            name: filename,
            overwrite: true
        })

        if (!categoryPic.moved()) {
            return profilePic.error()
        }
        let category = new ModelRepository(Category)
        let obj = {
            name: name,
            slug: slug,
            image: `${request.protocol()}://${request.header('host')}/uploads/images/category/${filename}`
        }
        try {
            let store = await category.create(obj)
            if (store) {
                return response.Wrapper(
                    201,
                    true,
                    'Store category data successfully!',
                    store
                )
            } else {
                return response.Wrapper(
                    500,
                    false,
                    "Something went wrong, please try again later!"
                )
            }
        } catch (error) {
            console.log("error category store", error)
            return response.Wrapper(
                500,
                false,
                "Something went wrong, please try again later!"
            )
        }
    }
}

module.exports = CategoryController
