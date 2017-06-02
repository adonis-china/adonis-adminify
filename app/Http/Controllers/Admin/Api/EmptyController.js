'use strict'

const RestController = require('./RestController')

class EmptyController extends RestController {
  get resource() {
    return 'change me to my table name'
  }

  get expand() {
    return null //or ['type']
  }


  * gridData() {
    //change the fields
    return {
      options: {
        sort: 'id', //or '-id' as desc
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
          name: { label: 'Name' },
          created_at: { label: t('fields.Type.created_at'), type: 'date' }
        },
        rules: {},

      },
      columns: [
        { text: t('fields.Type.id'), value: 'id' },
        { text: t('fields.Type.name'), value: 'name'}
        
      ]
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

module.exports = EmptyController
