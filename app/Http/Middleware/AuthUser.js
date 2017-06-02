'use strict'



class AuthUser {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    global.authUser = request.auth.user
    global.authUserId = authUser ? authUser.id : null
    

    yield next
  }

}

module.exports = AuthUser
