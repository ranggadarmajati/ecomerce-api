'use strict'
const fs = require('fs');
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
        if (!data) {
            return response.Wrapper(
                404,
                false,
                "Category not found!"
            )
        }
        return response.Wrapper(
            200,
            true,
            "Get Category Data By id Successfully",
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
            image: filename,
            image_url: `${request.protocol()}://${request.header('host')}/uploads/images/category/${filename}`
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

    async update({ response, request, params }) {
        let category = new ModelRepository(Category)
        let { id } = params
        const { name } = request.all()
        let slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        if (request.file('category_pic')) {
            let data = await category.showBy('uuid', id)
            if (!data) {
                return response.Wrapper(
                    404,
                    false,
                    "Category not found!"
                )
            }
            const removeFile = Helpers.promisify(fs.unlink)
            const imgFile = Helpers.publicPath(`uploads/images/category/${data.image}`)
            try {
                await removeFile(imgFile)
            } catch (error) {
                console.log('Error delete image file', error.message)
            }
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
            let updateData = {
                name: name,
                slug: slug,
                image: filename,
                image_url: `${request.protocol()}://${request.header('host')}/uploads/images/category/${filename}`
            }
            let updateRes = await category.merge(id, updateData);
            if (!updateRes) {
                return response.Wrapper(
                    500,
                    false,
                    "Something went wrong, please try again later!"
                )
            }
            return response.Wrapper(
                200,
                true,
                'Update category data successfully!',
                updateRes
            )
        } else {
            let updateData = {
                name: name,
                slug: slug
            }
            let updateRes = await category.merge(id, updateData);
            if (!updateRes) {
                return response.Wrapper(
                    500,
                    false,
                    "Something went wrong, please try again later!"
                )
            }
            return response.Wrapper(
                200,
                true,
                'Update category data successfully!',
                updateRes
            )
        }
    }
}

module.exports = CategoryController
