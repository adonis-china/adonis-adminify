'use strict'

const Schema = use('Schema')

class UserTitleTableSchema extends Schema {

  up () {
    this.create('user_title', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.integer('title_id').unsigned().notNullable()
      table.foreign('title_id').references('titles.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('user_title')
  }

}

module.exports = UserTitleTableSchema
