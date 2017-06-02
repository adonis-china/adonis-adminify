'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id')
      table.integer('type_id').unsigned().nullable()
      table.foreign('type_id').references('types.id')
      table.string('title').notNullable()
      table.text('body')
      table.timestamp('published_at').nullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
