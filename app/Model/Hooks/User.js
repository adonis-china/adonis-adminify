'use strict'

const Hash = use('Hash')
const Mock = require('mockjs')

const User = exports = module.exports = {}


User.encryptPassword = function * (next) {
  // {this} belongs to model instance
  if (this.password && this.password.length < 30) {
    this.password = yield Hash.make(this.password)
  }
  yield next
}

User.generateUsername = function * (next) {
  if (!this.username) {
    this.username = Mock.mock('@word(4, 6)')
  }
  yield next
}

User.generateNickname = function * (next) {
  if (!this.nickname) {
    this.nickname = Mock.mock('@name')
  }
  yield next
}
User.generateAvatar = function * (next) {
  if (!this.avatar) {
    this.avatar = Mock.Random.image('128x128', '#5a4675', '#fff', this.nickname.substr(0, 1))
  }
  yield next
}

