'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Env = use('Env');
const Route = use('Route')

Route.get('/', () => {
  return { applicationName: Env.get('APP_NAME', 'e-comerce API'), version: '1.0.0', documentations:null, status: 'OK' }
})
