'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {
  
  static boot () {
    super.boot()

      // this.addHook('beforeUpdate', 'Common.fillUserId')
      this.addHook('beforeCreate', 'Common.fillUserId')

  }

  static rules (post) {
      return {
        type_id: 'required',
        title:`required`,
//        title:`required|unique:posts,title,title,${post.title}`,
        body:'required'
      }
  }

  static get messages () {
    return {
      'type_id.required': '类别要选一个哦',
      'title.required': '标题哪能忘记呢',
      'body.required': '多少还是写点内容吧',
    }
  }

  static scopeActive (builder) {
    builder.where('deleted_at', null)
  }

  static scopeMine (builder) {
    builder.where('user_id', authUserId)
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  static get hidden () {
    return ['password']
  }

  tags () {
    return this.belongsToMany('App/Model/Tag', 'post_tag', 'post_id', 'tag_id')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  type () {
    return this.belongsTo('App/Model/Type')
  }

  comments () {
    return this.hasMany('App/Model/Comment')
  }


}

module.exports = Post