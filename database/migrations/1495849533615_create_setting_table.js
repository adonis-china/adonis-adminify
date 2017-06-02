'use strict'

const Schema = use('Schema')

class SettingsTableSchema extends Schema {

  up () {
    this.create('settings', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('title').notNullable()
      table.integer('parent_id').unsigned().nullable()
      table.foreign('parent_id').references('settings.id').onDelete('SET NULL')
      table.string('type')
      table.text('value')
      table.text('options')
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('settings')
  }

}

module.exports = SettingsTableSchema
