'use strict'


const url = require('url');
const querystring = require('querystring');
const marked = require('marked');

class Request {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    const View = response.viewInstance
    
    global.request = request

    View.global('params', function (param) {
      
      let currentUrl = request.url()
      let qs = request.get()
      for (let k in param) {
        qs[k] = param[k]
      }

      return currentUrl + '?' + querystring.stringify(qs);
    })

    View.global('marked', function (text) {
      return marked(text)
    })

    View.global('isLocal', function () {
      
      return true
    })

    
    yield next
  }

}

module.exports = Request
