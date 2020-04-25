'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async index() {
    const user = await User.all();
    return user;
  }

  async show({ params, request, response, auth }) {
    const user = await User.query().where('id', params.id).first();

    if (!user) {
      return response.status(404).send({message: 'Nenhum registro encontrado.'})
    }

    await user.load('posts')
    await user.load('relationships')
    return user;
  }
}

module.exports = UserController;
