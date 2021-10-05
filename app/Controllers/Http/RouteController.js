'use strict'
const Env = use('Env')
const Route = use('Route')

class RouteController {
    async index({ response }) {
        let arr = { applicationName: Env.get('APP_NAME', 'e-comerce API'), version: '1.0.0', documentations: null, status: 'OK' }
        return response.Wrapper(
            200,
            true,
            "Server running & API ready to consume",
            arr
        );
    }
    async getRoute({ view }) {
        let get_route = await Route.list()
        let selected_routes = []
        for (const iterator of get_route) {
            if (iterator.name !== '/' && iterator.name !== 'routes' && iterator.name !== 'uploads/images' && iterator.name !== 'css' && iterator.name !== 'js' && iterator.name !== 'fonts') selected_routes.push(iterator)
        }
        let logo_img_url = `${Env.get('APP_URL')}/uploads/images/about/about.png`
        return view.render('routes.table-route', { get_route: selected_routes, logo_img_url })
    }
}

module.exports = RouteController
