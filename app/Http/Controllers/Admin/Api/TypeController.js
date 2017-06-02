'use strict'

const RestController = require('./RestController')

const Type = use('App/Model/Type')

class TypeController extends RestController {
  get resource() {
    return 'types'
  }

  get expand() {
    return null
  }


  * gridData() {

    return {
      options: {
        sort: 'id',
        create: false,
        update: true,
        delete: false
      },
      // filters: false,
      filters: {
        model: {
          name: '',
          created_at: ''
        },
        fields: {
          name: { label: t('fields.Type.name') },
          created_at: { label: t('fields.Type.created_at'), type: 'date' }
        },
        rules: {},

      },
      columns: [
        { text: t('fields.Type.id'), value: 'id' },
        { text: t('fields.Type.name'), value: 'name'}
        
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
        model = yield Type.query().where('id', id).first()
      }
    }

    return {
      
      model: model,
      fields: {
        name: { label: t('fields.Type.name'), required: true}
      },
      rules: model.rules,
      messages: model.messages
    }
  }

  
}

module.exports = TypeController
