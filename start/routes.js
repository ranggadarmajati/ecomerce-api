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

// banner
Route.group(() => {
  Route.get('/', 'BannerController.index').as('admin/banner')
  Route.get('/query', 'BannerController.getByQuery').as('admin/banner/query')
  Route.get('/:id/show', 'BannerController.show').as('admin/banner/show')
  Route.post('/', 'BannerController.store').as('admin/banner/store').validator('BannerRequest')
  Route.patch('/:id/update', 'BannerController.update').as('admin/banner/update').validator('BannerUpdateRequest')
  Route.delete('/:id/delete', 'BannerController.delete').as('admin/banner/delete')
}).prefix('api/v1/admin/banner').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end banner

// contact
Route.group(() => {
  Route.get('/', 'ContactController.index').as('admin/contact')
  Route.patch('/', 'ContactController.update').as('admin/contact/update').validator('ContactUpdateRequest')
}).prefix('api/v1/admin/contact').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end contact

// faq
Route.group(() => {
  Route.get('/', 'FaqController.index').as('admin/faq')
  Route.get('/query', 'FaqController.getQuery').as('admin/faq/query')
  Route.get('/:id/show', 'FaqController.show').as('admin/faq/show')
  Route.post('/', 'FaqController.store').as('admin/faq/store').validator('FaqRequest')
  Route.patch('/:id/update', 'FaqController.update').as('admin/faq/update').validator('FaqRequest')
  Route.delete('/:id/delete', 'FaqController.delete').as('admin/faq/delete')
}).prefix('api/v1/admin/faq').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end faq

// terms of use
Route.group(() => {
  Route.get('/', 'TermsOfUseController.index').as('admin/termsofuse')
  Route.get('/query', 'TermsOfUseController.getQuery').as('admin/termsofuse/query')
  Route.get('/:id/show', 'TermsOfUseController.show').as('admin/termsofuse/show')
  Route.post('/', 'TermsOfUseController.store').as('admin/termsofuse/store').validator('FaqRequest')
  Route.patch('/:id/update', 'TermsOfUseController.update').as('admin/termsofuse/update').validator('FaqRequest')
  Route.delete('/:id/delete', 'TermsOfUseController.delete').as('admin/termsofuse/delete')
}).prefix('api/v1/admin/termsofuse').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end terms of use

// privacy police
Route.group(() => {
  Route.get('/', 'PrivacyPoliceController.index').as('admin/privacypolice')
  Route.get('/query', 'PrivacyPoliceController.getQuery').as('admin/privacypolice/query')
  Route.get('/:id/show', 'PrivacyPoliceController.show').as('admin/privacypolice/show')
  Route.post('/', 'PrivacyPoliceController.store').as('admin/privacypolice/store').validator('FaqRequest')
  Route.patch('/:id/update', 'PrivacyPoliceController.update').as('admin/privacypolice/update').validator('FaqRequest')
  Route.delete('/:id/delete', 'PrivacyPoliceController.delete').as('admin/privacypolice/delete')
}).prefix('api/v1/admin/privacypolice').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end privacy police

// product
Route.group(() => {
  Route.get('/', 'ProductController.index').as('admin/product')
  Route.get('/query', 'ProductController.getByQuery').as('admin/product/query')
  Route.get('/:id/show', 'ProductController.show').as('admin/product/show')
  Route.post('/', 'ProductController.store').as('admin/product/store').validator('ProductRequest')
  Route.post('/:id/upload', 'ProductController.uploadImage').as('admin/product/upload').validator('ImageUploadRequest')
  Route.delete('/:product_id/:id/imagedeleted', 'ProductController.deleteImage').as('admin/product/imagedeleted')
  Route.delete('/:product_id/:id/categorydeleted', 'ProductController.deleteCategory').as('admin/product/categorydeleted')
  Route.post('/:product_id/addcategory', 'ProductController.addCategory').as('admin/product/addcategory').validator('AddCategoryProductRequest')
  Route.post('/:product_id/addcolor', 'ProductController.addcolor').as('admin/product/addcolor')
  Route.delete('/:product_id/colordeleted', 'ProductColor.deleteColor').as('admin/product/colordeleted')
}).prefix('api/v1/admin/product').namespace('Admin').middleware(['apiAuth', 'PermissionAccess:sa,a'])
// end product
// end admin route