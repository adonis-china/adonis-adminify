'use strict'

const Schema = use('Schema')

class PagesTableSchema extends Schema {

  up () {
    this.create('pages', (table) => {
      table.increments()
      table.integer('type_id').unsigned().nullable()
      table.foreign('type_id').references('types.id')
      table.string('title').notNullable()
      table.text('body')
      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }

}

module.exports = PagesTableSchema
