'use strict'

const Lucid = use('Lucid')

class Page extends Lucid {
  type () {
    return this.belongsTo('App/Model/Type')
  }
}

module.exports = Page
