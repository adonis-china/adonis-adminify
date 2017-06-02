'use strict'

const Schema = use('Schema')

class CommentsTableSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.integer('post_id').unsigned().nullable()
      table.foreign('post_id').references('posts.id').onDelete('SET NULL')
      table.integer('reply_id').unsigned().nullable()
      table.foreign('reply_id').references('comments.id').onDelete('SET NULL')
      table.text('body')
      table.timestamp('deleted_at').nullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentsTableSchema
