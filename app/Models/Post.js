'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Env = use('Env')

class Post extends Model {

  static get computed() {
    return ['avatar_url'];
  }

  static get hidden() {
    return ['image_url', 'updated_at', 'created_at'];
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  getAvatarUrl({ image_url }) {
    return `${Env.get('APP_URL')}/files/${image_url}`;
  }
}

module.exports = Post
