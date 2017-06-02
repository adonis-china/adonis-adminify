'use strict'

const Lucid = use('Lucid')

class Token extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Token
