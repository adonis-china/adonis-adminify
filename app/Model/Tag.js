'use strict'

const Lucid = use('Lucid')

class Tag extends Lucid {
  posts () {
    return this.belongsToMany('App/Model/Post', 'post_tag', 'tag_id', 'post_id')
  }
}

module.exports = Tag
