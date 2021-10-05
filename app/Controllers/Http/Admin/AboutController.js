'use strict'
const Helpers = use('Helpers')
const About = use('App/Models/About')
const ModelRepository = use('App/Repository/Model')
class AboutController {
    async index({ response }) {
        let about = new ModelRepository(About)
        let data = await about.last()
        return response.Wrapper(
            200,
            true,
            "get About data successfully!",
            data
        )
    }

    async update({ response, request }) {
        let { content } = request.all()
        let about = new ModelRepository(About)
        let data = await about.last()
        if(!request.file('about_pic')) {
            let update_data = {
                content: content
            }
            let res = await about.merge(data.uuid, update_data);
            if (!res) {
                return response.Wrapper(
                    500,
                    false,
                    "Something went wrong, please try again later!"
                )
            }
            return response.Wrapper(
                200,
                true,
                'Update About data successfully!',
                res
            )
        }
        const aboutPic = request.file('about_pic', {
            types: ['image'],
            size: '5mb',
            extnames: ['png', 'jpg', 'jpeg']
        });
        let filename = `about.png`;
        await aboutPic.move(Helpers.publicPath('uploads/images/about'), {
            name: filename,
            overwrite: true
        })

        if (!aboutPic.moved()) {
            return profilePic.error()
        }

        let updateData = {
            content: content
        }
        let updateRes = await about.merge(data.uuid, updateData);
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
            'Update About data successfully!',
            updateRes
        )
    }
}

module.exports = AboutController
