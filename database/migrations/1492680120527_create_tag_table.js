'use strict'

const Schema = use('Schema')

class TagsTableSchema extends Schema {

  up () {
    this.create('tags', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('icon')
      table.string('color')
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('tags')
  }

}

module.exports = TagsTableSchema
