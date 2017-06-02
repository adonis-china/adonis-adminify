'use strict'

const inflect = require('i')()
const Validator = use('Validator')

const Setting = use('App/Model/Setting')

class SettingController  {
  
  get model() {
    return Setting
  }

  * validate(model, scenario) {
    //set different rules and messages for different `scenario`, such as 'create', 'update', 'changePassword' ...
    //see `get rules()` and `get messages()` in Model files
    model.scenario = scenario
    let messages = Object.assign(t('validation'), model.messages)
    const valid = yield Validator.validate(model.attributes, model.rules, messages)
    if (valid.fails()) {
      response.status(422).json(valid.messages())
    }
  }

  // update - PATCH /api/:resource/:id
  * update(request, response) {
    const model = yield this.model.findOrFail(request.param('id'))
    yield this.save(model, request, response)
  }

  * form (request, response) {
    let rs = yield this.model.all()
    let model = {} //or `code`, `name`
    let fields = {}
    let rules = {}
    let messages = {}
    
    for (let row of rs.toJSON()) {
      let {name: key, title: label,type, options, value} = row
      
      if (options) {
        options = JSON.parse(options)
      }
      
      model[key] = value
      fields[key] = {label, type, options}
    }

    let data = {
      model: model,
      fields: fields,
      rules: rules,
      messages: messages
    }

    response.json(data)
  }
}

module.exports = SettingController
