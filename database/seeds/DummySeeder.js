'use strict'

const Factory = use('Factory')
const Mock = use('mockjs')
const Hash = use('Hash')

class DummySeeder {

  * run () {

    yield Factory.model('App/Model/User').create(37)

    const posts = yield Factory.model('App/Model/Post').create(27)
    posts.each(function * (post) {
      let rnd = Mock.mock({
        'ids|1': [
          [{id:1},{id:2}],
          [{id:2},{id:3}],
          [{id:2}],
          [{id:4}],
          [{id:1}],
          [{id:3}]
        ]
      })
      // console.log(rnd.ids)
      post.tags().attach(rnd.ids)
    })

    yield Factory.model('App/Model/Comment').reset()
    const comments = yield Factory.model('App/Model/Comment').create(37)
    comments.each(function * (comment) {
      if (Mock.mock('@integer(0,2)')) {
        comment.reply_id = Mock.mock('@integer(1,10)')
        yield comment.save()
      }
    })  }

}

module.exports = DummySeeder
