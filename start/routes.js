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

Route.get('/', ({ response }) => {
  let arr = { applicationName: Env.get('APP_NAME', 'e-comerce API'), version: '1.0.0', documentations: null, status: 'OK' }
  response.Wrapper(
    200,
    true,
    "Server running & API ready to consume",
    arr
  );
});

Route.group(() => {
  Route.post('/', 'AuthController.login').as('auth/login').validator('LoginRequest')
  Route.post('/logout', 'AuthController.logout').as('auth/logout').middleware(['apiAuth'])
  Route.get('/', 'AuthController.profile').as('auth/profile').middleware(['apiAuth'])
  Route.post('/register', 'AuthController.register').as('auth/register').validator('RegisterRequest')
  Route.get('/activation/:activationKey', 'AuthController.activation').as('auth/activation')
  Route.post('/forgot', 'AuthController.forgotPasword').as('auth/forgotPassword').validator('ForgotRequest')
  Route.post('/verification', 'AuthController.forgotVerification').as('auth/verification').validator('ForgotVerification')
  Route.post('/reset/:uuid/password', 'AuthController.resetPassword').as('auth/resetpassword').validator('ResetPasswordRequest')
}).prefix('api/v1/auth')

// admin route
// category
Route.group(() => {
  Route.get('/', 'CategoryController.index').as('admin/category')
  Route.post('/', 'CategoryController.store').as('admin/category/store').validator('CategoryRequest')
  Route.patch('/:id/update', 'CategoryController.update').as('admin/category/update')
  Route.get('/:id/show', 'CategoryController.show').as('admin/category/:id')
  Route.get('/query', 'CategoryController.getByQuery').as('admin/category/query')
}).prefix('api/v1/admin/category').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end category

// color
Route.group(() => {
  Route.get('/', 'ColorController.index').as('admin/color')
  Route.get('/:id/show', 'ColorController.show').as('admin/color/:id')
  Route.get('/query', 'ColorController.getByQuery').as('admin/color/query')
}).prefix('api/v1/admin/color').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end color
// end admin route

// assets load
Route.get('/uploads/images/:directory/:filename', ({ response, request, params }) => {
  const Helpers = use('Helpers')
  let { directory, filename } = params
  if (request.header("upgrade-insecure-requests")) {
    return response.Wrapper(
      406,
      false,
      'Not Acceptable. please access on web app or mobile app',
      'denied'
    )
  } else {
    return response.download(Helpers.publicPath(`uploads/images/${directory}/${filename}`))
  }
})