'use strict'

const Factory = use('Factory')

class SetupSeeder {

  * run () {


    yield use('App/Model/Title').createMany([
      {name: 'Founder'}, {name: 'Team'}, {name: 'Developer'}, {name: 'Author'}, {name: 'Sponsor'}
    ])
    yield use('App/Model/Type').createMany([
      {name: 'Share'}, {name: 'Q&A'}, {name: 'Recruitment'}, {name: 'Outsource'}, {name: 'Feedback'}
    ])

    yield use('App/Model/Tag').createMany([
      {name: 'Lucid'}, {name: 'Ace'}, {name: 'Extension'}, {name: 'Wechat'}
    ])

    yield use('App/Model/User').createMany([
      {
        email: 'admin@admin.com',
        username: 'admin',
        nickname: 'Super Admin',
        password: 'admin',
        avatar: 'https://dummyimage.com/128/5a4675/ffffff.png&text=A'
      }
    ])
  }

}

module.exports = SetupSeeder
