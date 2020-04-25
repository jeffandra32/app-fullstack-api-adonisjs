'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Relationship extends Model {

  static get hidden () {
    return ['id', 'user_id', 'updated_at']
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Relationship
