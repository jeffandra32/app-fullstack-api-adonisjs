'use strict'

const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/files/:file', 'FileController.show');

// Autheticação
Route.post('/v1/register', 'RegisterController.register').validator('Register');
Route.post('/v1/login', 'AuthController.authenticate').validator('Auth');
Route.post('/v1/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/v1/reset', 'ResetPasswordController.store').validator('Reset');

// User
Route.resource('/v1/users', 'UserController').apiOnly().middleware('auth');

// Post
Route.resource('/v1/posts', 'PostController').apiOnly().middleware('auth');

// Relationship
Route.resource('/v1/relationship', 'RelationshipController').apiOnly().middleware('auth');

// Profile
Route.put('/v1/profile', 'ProfileController.update').middleware('auth');

// Files


