'use strict'

const Factory = use('Factory')

class SetupSeeder {

  * run () {


    yield use('App/Model/Title').createMany([
      {name: '创始人'}, {name: '核心成员'}, {name: '翻译组'}, {name: '开发者'}, {name: '特邀作者'}, {name: '赞助者'}
    ])
    yield use('App/Model/Type').createMany([
      {name: '分享'}, {name: '问答'}, {name: '招聘'}, {name: '外包'}, {name: '反馈'}
    ])

    yield use('App/Model/Tag').createMany([
      {name: 'Lucid'}, {name: 'Ace'}, {name: '扩展'}, {name: '微信'}
    ])

    yield use('App/Model/User').createMany([
      {
        email: 'wu-xuesong@qq.com',
        username: 'wxs77577',
        nickname: 'Johnny吴雪松',
        password: '123456',
        avatar: 'https://dummyimage.com/128/5a4675/ffffff.png&text=A'
      }
    ])
  }

}

module.exports = SetupSeeder
