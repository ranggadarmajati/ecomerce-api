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
const Route = use('Route')

Route.get('/', 'RouteController.index');
Route.get('routes', 'RouteController.getRoute').as('routes')
// assets load
Route.get('/uploads/images/:directory/:filename', 'AssetController.uploadImages').as('uploads/images')
Route.get('/css/:filename', 'AssetController.css').as('css')
Route.get('/js/:filename', 'AssetController.js').as('js')
Route.get('/fonts/:filename', 'AssetController.fonts').as('fonts')
// end assets load

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
  Route.patch('/:id/update', 'CategoryController.update').as('admin/category/update').validator('CategoryUpdateRequest')
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

// courier
Route.group(() => {
  Route.get('/', 'CourierController.index').as('admin/courier')
  Route.get('/query', 'CourierController.getByQuery').as('admin/courier/query')
  Route.get('/:id/activeDeactive', 'CourierController.activeDeactive').as('admin/courier/activeDeactive')
}).prefix('api/v1/admin/courier').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end courier

// about
Route.group(() => {
  Route.get('/', 'AboutController.index').as('admin/about')
  Route.patch('/', 'AboutController.update').as('admin/about/update').validator('AboutUpdateRequest')
}).prefix('api/v1/admin/about').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
//end about
// end admin route