'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
const inflect = require('i')()

Route.on('/').render('welcome')


Route.group('admin/api', function () {
	const prefix = 'Admin/Api/'
	const resources = ['posts', 'users', 'types', 'comments', 'settings']

	Route.get('/menu', `${prefix}UserController.menu`).as('menu')
	Route.post('/login', `${prefix}UserController.login`)
	
	for (let k in resources) {
		let resource = resources[k]
		let className = inflect.classify(resource)
		Route.get(`/${resource}/grid`, `${prefix}${className}Controller.grid`)
		Route.get(`/${resource}/form`, `${prefix}${className}Controller.form`)
		Route.resource(`/${resource}`, `${prefix}${className}Controller`)
	}

	Route.get(`/:resource/grid`, `${prefix}RestController.grid`)
	Route.get(`/:resource/form`, `${prefix}RestController.form`)
	Route.resource(`/:resource`, `${prefix}RestController`)
	


}).prefix('admin/api')