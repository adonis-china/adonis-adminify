'use strict'

const Schema = use('Schema')

class TypesTableSchema extends Schema {

  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('icon')
      table.string('color')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('types')
  }

}

module.exports = TypesTableSchema
