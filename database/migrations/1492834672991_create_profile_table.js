'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
