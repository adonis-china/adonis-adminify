'use strict'

const Lucid = use('Lucid')

class Title extends Lucid {
  users () {
    return this.belongsToMany('App/Model/User', 'user_title', 'title_id', 'user_id')
  }
}

module.exports = Title
