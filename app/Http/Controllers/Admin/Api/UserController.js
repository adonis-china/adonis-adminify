'use strict'

const RestController = require('./RestController')

const User = use('App/Model/User')

class UserController extends RestController {
  get resource() {
    return 'users'
  }

  get expand() {
    return null
  }

  * login(request, response)
  {
    const auth = request.auth.authenticator('jwt')

    let data = request.only('username', 'password')
    let token = null
    let user = null
    try {
      user = yield auth.validate(data.username, data.password, true)
      token = yield auth.generate(user)
    } catch (e) {
      response.status(401).json({
        // e: e,
        message: 'Username or password is incorrect'
      })
      return
    }

    response.json({
      user: user,
      token: token,
    })
  }

  * gridData() {

    return {
      filters: {
        model: {
          username: '',
          created_at: ''
        },
        fields: {
          username: { label: t('fields.user.username') },
          created_at: { label: t('fields.user.created_at'), type: 'date' }
        },
        rules: {},

      },
      columns: [
        { text: t('fields.user.id'), value: 'id' },
        { text: t('fields.user.username'), value: 'username'},
        { text: t('fields.user.nickname'), value: 'nickname', width: 100 },
        { text: t('fields.user.mobile'), value: 'mobile', width: 100 },
        { text: t('fields.user.created_at'), value: 'created_at', width: 180 },
        
      ],
      actions: {
        edit: true, delete: true
      }
    }
  }

  * formData (request, response) {

    let model = {}
    let id
    if (request) {
      id = request.input('id')
      if (id) {
        model = yield User.query().where('id', id).first()
      }
    }

    return {
      
      model: model,
      fields: {
        username: { label: t('fields.user.username'), required: true},
        nickname: { label: t('fields.user.nickname'), required: true},
        avatar: {label: t('fields.user.avatar')}
      },
      rules: model.rules,
      messages: model.messages
    }
  }

  * menu (request, response) {
    response.send({
      1: {
        href: '/',
        title: 'Home',
        icon: 'home'
      },
      2: {
        href: '/crud/posts',
        title: 'Posts',
        icon: 'view_list'
      },
      3: {
        href: '/crud/posts/create',
        title: 'Create Post',
        icon: 'note_add'
      },
      4: {
        href: '/crud/users',
        title: 'Users',
        icon: 'people'
      },
      5: {

        title: 'Pages',
        icon: 'domain',
        items: {
          6: {
            href: '/example',
            title: 'Example'
          },
          7: {
            href: '/about',
            title: 'About'
          },
          

        }
      },
      8: {
        href: '/login',
        icon: 'lock',
        title: 'Logout'
      },
    })
  }
}

module.exports = UserController
