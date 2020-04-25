'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.enu('session', [1, 2, 3, 4]).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostSchema;