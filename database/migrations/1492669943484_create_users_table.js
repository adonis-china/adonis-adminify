'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('nickname', 80).notNullable().unique()
      table.string('mobile', 80).unique().nullable()
      table.string('email', 80).notNullable().unique()
      table.string('avatar', 254).nullable()
      table.string('password', 60).notNullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
