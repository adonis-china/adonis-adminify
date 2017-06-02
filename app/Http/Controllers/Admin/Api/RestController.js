'use strict'

const inflect = require('i')()
const Validator = use('Validator')

// class RestfulController {
class RestController {

  // create - POST /api/:resource
  * store(request, response) {
    const model = new this.model
    yield this.save(model, request, response)
  }
  

  // readMany - GET /api/:resource
  * index(request, response) {
    const model = this.model
    let query = model.query()
    let where = JSON.parse(request.input('query'))
    let expand = request.input('expand', this.expand)
    let sort = request.input('sort', '-id')

    let conditions = []
      // console.log('query():where', where, typeof where)
      console.log(this.resource)
    let tableName = inflect.pluralize(this.resource)
    for (let k in where) {
      const v = where[k]
      if (v === '') {
        continue
      }
      if (typeof v === 'string') {
        query.where(tableName + '.' + k, 'like', `%${v}%`)
      }
      console.log(k, v)
    }
    
    console.log('query():expand', expand)
    if (expand) {
      // query.select(['posts.body as post_body'])
      query.with(expand)
      for (let k in expand){
        const expandTableName = inflect.pluralize(expand[k]) //types
        const expandFieldName = `${inflect.singularize(expandTableName)}_id` //type_id
        // query.join(expandTableName, `${expandTableName}.id`, `${tableName}.${expandFieldName}`)
      }
      
    }
    if (sort){
      let sortData = sort.split('-')
      let desc = sortData.length > 1
      let sortField = sortData.pop()

      if (sortField.indexOf('.') < 0) {
        sortField = sortField
      }
      console.log('sort: ', sortField, desc)
      query.orderBy(sortField, desc ? 'desc' : 'asc')
      
    }
    const results = yield query.paginate(request.input('page', 1), request.input('per_page', 10))
    
    response.json(results)
  }

  // readOne - GET /api/:resource/:id
  * show(request, response) {
    console.log('show()', request.all())
    const model = this.model
    const query = model.query().where({ id: request.param('id') })

    const expand = request.input('expand')
    console.log('show():expand', expand)
    if (expand) {
      query.with(expand)
    }

    const result = yield query.first()
    console.log('show():result', result)
    response.json(result)
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

  * save(model, request, response) {
    let data = request.all()
    let form
      //fill fields defined in `this.formData()` only
    if (form = yield this.formData()) {
      data = request.only(Object.keys(form.fields))
    }
    model.fill(data)
    yield this.validate(model)
    delete model.attributes.scenario
    const result = yield model.save()
    response.json(model)
  }

  // update - PATCH /api/:resource/:id
  * update(request, response) {
    const model = yield this.model.findOrFail(request.param('id'))
    yield this.save(model, request, response)
  }

  // delete - DELETE /api/:resource/:id
  * destroy(request, response) {
    const model = this.model
    const record = yield model.find(request.param('id'))
    const result = yield record.delete()
    response.json(result)
  }

  * grid(request, response) {
    response.json(yield this.gridData())
  }

  * form(request, response) {
    response.json(yield this.formData(request, response))
  }

  get resource() {
    const request = global.request
    return request.param('resource')
  }

  get model() {
    const model = use('App/Model/' + inflect.classify(this.resource))
    return model
  }

  get gridColumns() {
    
    return global.request.input('fields', 'id').split(',')
  }
  get formFields() {
    return global.request.input('fields').split(',')
  }

  * gridData() {
    const singular = inflect.singularize(this.resource)
    return {
      columns: this.gridColumns.map(field => ({ text: t(`fields.${singular}.${field}`), value: field })),
      actions: true
    }
  }

  * formData(request, response) {
    const singular = inflect.singularize(this.resource)

    let model = {}
    let id
    if (request) {
      id = request.input('id')
      if (id) {
        model = yield this.model.query().where('id', id).first()
      }
    }
    let fields = {}
    this.formFields.map(field => {
      fields[field] = { label: t(`fields.${singular}.${field}`) }
    })
    return {

      model: model,
      fields: fields,
      rules: this.model.rules,
      messages: this.model.messages
    }
  }
}

// module.exports = RestfulController
module.exports = RestController