'use strict'
const fs = require('fs')
const Helpers = use('Helpers')
const Banner = use('App/Models/Banner')
const ModelRepository = use('App/Repository/Model')

class BannerController {
    async index({ response }) {
        let banner = new ModelRepository(Banner)
        let data = await banner.showAll()
        return response.Wrapper(
            200,
            true,
            'Get Banner data successfully!',
            data
        )
    }

    async getByQuery({ response, request }) {
        let banner = new ModelRepository(Banner)
        let data = await banner.showQuery(request)
        return response.Wrapper(
            200,
            true,
            'Get Banner data successfully!',
            data
        )
    }

    async show({ response, params }) {
        let { id } = params
        let banner = new ModelRepository(Banner)
        let data = await banner.showBy('uuid', id)
        if (!data) {
            return response.Wrapper(
                404,
                false,
                "Banner not found!"
            )
        }
        return response.Wrapper(
            200,
            true,
            "Get Banner Data By id Successfully",
            data
        )
    }

    async store({ response, request }) {
        const { title, description, link_url, position } = request.all()
        let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const bannerPic = request.file('banner_pic', {
            types: ['image'],
            size: '5mb',
            extnames: ['png', 'jpg', 'jpeg']
        })
        const extension = bannerPic.extname
        const filename = `${slug}.${extension}`
        const path = 'uploads/images/banner'
        await bannerPic.move(Helpers.publicPath(`${path}`), {
            name: filename,
            overwrite: true
        })

        if (!bannerPic.moved()) {
            return bannerPic.error()
        }

        let banner = new ModelRepository(Banner)
        let obj = {
            title: title,
            description: description,
            link_url: link_url,
            position: position,
            image: filename,
            image_path: path,
            image_url: `${request.protocol()}://${request.header('host')}/${path}/${filename}`
        }
        try {
            let store = await banner.create(obj)
            if (store) {
                return response.Wrapper(
                    201,
                    true,
                    'Store banner data successfully!',
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
            console.log("error banner store", error)
            return response.Wrapper(
                500,
                false,
                "Something went wrong, please try again later!"
            )
        }
    }

    async update({ response, request, params }) {
        let banner = new ModelRepository(Banner)
        let { id } = params
        const { title, description, link_url, position } = request.all()
        let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        if (request.file('banner_pic')) {
            let data = await banner.showBy('uuid', id)
            if (!data) {
                return response.Wrapper(
                    404,
                    false,
                    "Banner not found!"
                )
            }
            const removeFile = Helpers.promisify(fs.unlink)
            const path = 'uploads/images/banner'
            const imgFile = Helpers.publicPath(`${path}/${data.image}`)
            try {
                await removeFile(imgFile)
            } catch (error) {
                console.log('Error delete banner image file', error.message)
            }
            const bannerPic = request.file('banner_pic', {
                types: ['image'],
                size: '5mb',
                extnames: ['png', 'jpg', 'jpeg']
            })
            const extension = bannerPic.extname
            const filename = `${slug}.${extension}`
            await bannerPic.move(Helpers.publicPath(`${path}`), {
                name: filename,
                overwrite: true
            })

            if (!bannerPic.moved()) {
                return profilePic.error()
            }
            let obj = {
                title: title,
                description: description,
                link_url: link_url,
                position: position,
                image: filename,
                image_path: path,
                image_url: `${request.protocol()}://${request.header('host')}/${path}/${filename}`
            }
            let updateRes = await banner.merge(id, obj);
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
                'Update banner data successfully!',
                updateRes
            )
        } else {
            let obj = {
                title: title,
                description: description,
                link_url: link_url,
                position: position
            }
            let updateRes = await banner.merge(id, obj);
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
                'Update banner data successfully!',
                updateRes
            )
        }
    }

    async delete({ response, params }) {
        let { id } = params
        let banner = new ModelRepository(Banner)
        let data = await banner.deleteBy('uuid', id)
        if (!data) {
            return response.Wrapper(
                500,
                false,
                "Something went wrong, please try again later!"
            )
        }
        return response.Wrapper(
            200,
            true,
            "Delete Banner Data By id Successfully"
        )
    }
}

module.exports = BannerController
