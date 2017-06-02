'use strict'

const Schema = use('Schema')

class PostTagTableSchema extends Schema {

  up () {
    this.create('post_tag', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable()
      table.foreign('post_id').references('posts.id').onDelete('CASCADE')
      table.integer('tag_id').unsigned().notNullable()
      table.foreign('tag_id').references('tags.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('post_tag')
  }

}

module.exports = PostTagTableSchema
