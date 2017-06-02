'use strict'

const RestController = require('./RestController')
const Page = use('App/Model/Page')
const Type = use('App/Model/Type')

class PageController extends RestController {
  get resource() {
    return 'pages'
  }

  get expand() {
    return ['type']
  }


  * gridData() {
    //change the fields
    return {
      options: {
        sort: 'id', //or '-id' as desc
        create: true,
        update: true,
        delete: true
      },
      // filters: false,
      filters: {
        model: {
          title: '',
          created_at: ''
        },
        fields: {
          title: { label: 'Title' },
          created_at: { label: t('fields.Page.created_at'), Page: 'date' }
        },
        rules: {},

      },
      columns: [
        { text: t('fields.Page.id'), value: 'id' },
        { text: t('fields.Page.title'), value: 'title'}
        
      ]
    }
  }

  * formData (request, response) {

    let model = {
      title: '',
      type_id: null,
      body: '',
    }
    let id
    if (request) {
      id = request.input('id')
      if (id) {
        model = yield Page.query().where('id', id).first()
      }
    }

    let typeOptions = yield Type.query().select('id','name').fetch()
    for (let type of typeOptions) {
      type.text = type.name
      type.value = type.id
    }

    return {
      
      model: model,
      fields: {
        title: { label: 'Title', hint: 'Page Title', required: true},
        type_id: {
          label: 'Type', type: 'select', options: typeOptions, required: true,
        },
        body: { label: 'Body', type: 'html' ,required: false},
      },
      rules: model.rules,
      messages: model.messages
    }
  }

  
}

module.exports = PageController
