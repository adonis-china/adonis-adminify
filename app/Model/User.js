'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')


class User extends Lucid {

  static boot() {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    // this.defineHooks('beforeCreate', [
    //   'User.encryptPassword',
    //   'User.generateUsername',
    //   'User.generateNickname',
    // ])

    // this.defineHooks('beforeUpdate', [
    //   'User.encryptPassword',
    // ])

    this.addHook('beforeCreate', 'User.encryptPassword')
    this.addHook('beforeCreate', 'User.generateUsername')
    this.addHook('beforeCreate', 'User.generateNickname')
    this.addHook('beforeCreate', 'User.generateAvatar')

    this.addHook('beforeUpdate', 'User.encryptPassword')
    this.addHook('beforeUpdate', 'User.generateAvatar')

  }

  static get hidden () {
    return ['password']
  }

  get rules() {
    const id = this.attributes.id
    switch (this.scenario) {
      default:
        return {
          username: `required|unique:users,username,id,${id}`,
          nickname: `required|unique:users,nickname,id,${id}`,
          // email: 'required|email|unique:users',
          password: 'required|min:6',
          password_confirmation: 'same:password'
        }
    }

  }

  get messages() {
    switch (this.scenario) {
      default:
        return {
          'email.required': '请填写邮箱',
          'email.email': '邮箱好像不对呢',
          'email.unique': '邮箱已存在，试试登录？',
          'password.required': '密码密码',
          'password.min': '密码太短啦',
          'password_confirmation.same': '重复密码有点问题',
          'username.required': '用户名可别忘了哦',
          'username.unique': '你来晚了，换个用户名吧',
          'nickname.required': '起个霸气的昵称吧',
          'nickname.unique': '你来晚了，换个昵称吧',
        }
    }

  }

  static get deleteTimestamp() {
    return 'deleted_at'
  }

  static get computed() {
    return ['fullname']
  }

  getFullname() {
    return this.nickname + ' @' + this.username
  }

  apiTokens() {
    return this.hasMany('App/Model/Token')
  }

  titles() {
    return this.belongsToMany('App/Model/Title', 'user_title', 'user_id', 'title_id')
  }



}

module.exports = User
