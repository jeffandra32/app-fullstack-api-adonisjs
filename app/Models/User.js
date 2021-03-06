'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Env = use('Env')

class User extends Model {
  static get computed() {
    return ['avatar_url'];
  }

  static boot() {
    super.boot();

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }

      if (userInstance.dirty.confirmPassword) {
        userInstance.confirmPassword = await Hash.make(
          userInstance.confirmPassword
        );
      }
    });
  }

 

  static get hidden() {
    return ['password', 'confirmPassword', 'created_at'];
  }

  relationships() {
    return this.hasMany('App/Models/Relationship');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  posts() {
    return this.hasMany('App/Models/Post');
  }

  getAvatarUrl({ avatar }) {
    return `${Env.get('APP_URL')}/files/${avatar}`;
  }
}

module.exports = User;
