'use strict'

class Admin {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    request.auth = request.auth.authenticator('admin')
    yield next
  }

}

module.exports = Admin
