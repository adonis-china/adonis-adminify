'use strict'

const RestController = require('./RestController')

const Comment = use('App/Model/Comment')

class CommentController extends RestController {
  get resource() {
    return 'comments'
  }

  get expand() {
    return ['post', 'user', 'reply']
  }


  * gridData() {

    return {
      filters: {
        model: {
          name: '',
          created_at: ''
        },
        fields: {
          body: { label: t('fields.Comment.body') },
          created_at: { label: t('fields.Comment.created_at'), Comment: 'date' }
        },
        rules: {},

      },
      columns: [
        { text: t('fields.Comment.id'), value: 'id' },
        { text: t('fields.Post.title'), value: 'post.title', left: true, sortable: false},
        { text: t('fields.User.Username'), value: 'user.username', left: true, sortable: false},
        { text: t('fields.Comment.body'), value: 'body', left: true, sortable: false},
        { text: t('fields.Comment.created_at'), value: 'created_at', width: 180 },
        
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
        model = yield Comment.query().where('id', id).first()
      }
    }

    return {
      
      model: model,
      fields: {
        body: { label: t('fields.Comment.body'), required: true}
      },
      rules: model.rules,
      messages: model.messages
    }
  }

  
}

module.exports = CommentController
