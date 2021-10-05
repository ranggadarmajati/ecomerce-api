'use strict'
const Database = use('Database')
const Courier = use('App/Models/Courier')
const ModelRepository = use('App/Repository/Model')
class CourierController {
    async index({ response }) {
        let courier = new ModelRepository(Courier)
        let data = await courier.showAll()
        return response.Wrapper(
            200,
            true,
            "Get Courier data successfully!",
            data
        )
    }

    async getByQuery({ response, request }) {
        let courier = new ModelRepository(Courier)
        let data = await courier.showQuery(request)
        return response.Wrapper(
            200,
            true,
            'Get Color data successfully!',
            data
        )
    }

    async activeDeactive({ response, params }) {
        const { id } = params
        let courier =  await Courier.findBy('uuid', id)
        const trx = await Database.beginTransaction()
        try {
            courier.active = !courier.active
            await courier.save(trx)
            await trx.commit()
            let status = courier.active ? "Enabled" : "Disabled";
            let message = `${status} ${courier.name} successfully! `
            return response.Wrapper(
                200,
                true,
                message,
                courier
            )
        } catch (error) {
            console.log('error activeDeactive courier:', error)
            await trx.rollback()
            return response.Wrapper(
                500,
                false,
                "Something went wrong, please try again later!"
            )
        }
    }
}

module.exports = CourierController
