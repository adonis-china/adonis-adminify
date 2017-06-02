'use strict'

const Schema = use('Schema')

class TitlesTableSchema extends Schema {

  up () {
    this.create('titles', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('titles')
  }

}

module.exports = TitlesTableSchema
