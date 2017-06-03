# Adonis Admin (Nodejs + Vue Admin dashboard)
> An admin dashboard application based on [AdonisJs](http://adonisjs.com/) and [Adminify](https://github.com/wxs77577/adminify)(based on [Vuetify](https://vuetifyjs.com/)), see more at [Adonis China](https://adonis-china.org/).
> Keywords: NodeJs, VueJs, AdonisJs, ORM, Relation, SQLite, MySQL, Middleware, Restful, CRUD, Material design

## Getting Start
### Server Side
1. `git clone https://github.com/adonis-china/adonis-admin.git`
1. `cd adonis-admin`
1. `cp .env.example .env`
1. `npm install && npm run serve:dev` start the api server
1. `./ace migration:refresh --seed` fill database (use `node ace` on windows)
### Client Side
1. `git submodule update --recursive --remote --init`  pull submodule
1. `cd adminify`
1. `cp src/config.sample.js src/config.js`  use `copy` on windows
1. Change `debug.mock` to `false` in `src/config.js` 
1. `npm install && npm run dev` start the client
1. Open  `http://localhost:8080` (or another port) in your browser.
> use `cnpm` instead `npm` in china

## UI Screenshots
|  |  |
|---|---|
|![1.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/1.png)|![2.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/2.png)|
|![3.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/3.png)|![4.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/4.png)|
|![5.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/5.png)|![6.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/6.png)|
|![7.png](https://raw.githubusercontent.com/wxs77577/adminify/master/screenshots/7.png)||

## Wrokflow - Add CRUD for a resource
- `./ace make:model -m Page`, Create `Page` Model with migration for **Pages** management.
- Open `/database/migrations/1496388160682_create_page_table.js`, add some fields:
  ```javascript
  table.increments()
  table.integer('type_id').unsigned().nullable()
  table.foreign('type_id').references('types.id')
  table.string('title').notNullable()
  table.text('body')
  table.timestamps()
  ```
- `./ace migration:run` to create table
- Open `/app/Model/Page.js`, add a `belongsTo` relation: 
  ```javascript
  class Page extends Lucid {
    type () {
      return this.belongsTo('App/Model/Type')
    }
  }
  ```
- Copy `/app/Http/Controllers/Admin/Api/EmptyController.js` to `PageController.js`, and change to this:
```javascript
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

```
- add route in `/app/Http/routes.js:26`
```javascript
  const resources = ['posts', 'users', 'types', 'comments', 'settings', 'pages']
```
- add menu in `/adminify/src/menu.js`, then you can see it shows in left side menu
```json
{ "href": "/crud/pages", "title": "Pages", "icon": "view_list" },
```
- Navigate to `http://localhost:8080/#/crud/pages` you get a grid list view of all pages.
- Press `plus` button to add a page, also you can edit it after added.