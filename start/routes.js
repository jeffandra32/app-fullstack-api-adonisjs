'use strict'

const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Autheticação
Route.post('/v1/register', 'RegisterController.register').validator('Register');
Route.post('/v1/login', 'AuthController.authenticate').validator('Auth');
Route.post('/v1/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/v1/reset', 'ResetPasswordController.store').validator('Reset');

// User
Route.get('/v1/users', async () => {
  return await User.all()
}).middleware('auth')

// Post
Route.post('/v1/posts', 'PostController.store').middleware('auth');




