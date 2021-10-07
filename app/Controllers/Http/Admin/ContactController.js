'use strict'
const Contact = use('App/Models/Contact')
const ModelRepository = use('App/Repository/Model')
class ContactController {
    async index({ response }) {
        let contact = new ModelRepository(Contact)
        let data = await contact.last()
        return response.Wrapper( 200, true, "get Contact data successfully!", data)
    }

    async update({ response, request }) {
        let contact = new ModelRepository(Contact)
        let data = await contact.last()
        let updateRes = await contact.merge(data.uuid, request.all())
        if(!updateRes){
            return response.Wrapper( 500, false, "Update Contact failed, please try again later!" )
        }
        return response.Wrapper( 200, true, "Update Contact Succesfully!" )
    }
}

module.exports = ContactController
