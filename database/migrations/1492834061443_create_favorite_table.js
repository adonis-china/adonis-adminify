'use strict'

const Schema = use('Schema')

class FavoritesTableSchema extends Schema {

  up () {
    this.create('favorites', (table) => {
      table.increments()
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.integer('post_id').unsigned().notNullable()
      table.foreign('post_id').references('posts.id').onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('favorites')
  }

}

module.exports = FavoritesTableSchema
