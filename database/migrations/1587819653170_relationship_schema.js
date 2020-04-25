'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelationshipSchema extends Schema {
  up () {
    this.create('relationships', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
      table.boolean('relationship').notNullable();
      table.integer('friends_id').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('relationships')
  }
}

module.exports = RelationshipSchema
