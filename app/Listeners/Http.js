'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = exports = module.exports = {}
const Antl = use('Antl')
const inflect = require('i')()

const Database = use('Database')

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function* (error, request, response) {
  const status = error.status || 500
  const type = request.accepts('json', 'html')

  if (request.ajax() || type == 'json') {
    response.status(status).send({
      status: status,
      stack: error.stack,
      message: error.message
    })
    return
  }
  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const youch = new Youch(error, request.request)
    const type = request.accepts('json', 'html')
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', { error })
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
  Antl.reload()
  global.t = function (key, params) {
    //fallback
    if (Antl.get(key) === key) {
      return inflect.titleize(key.split('.').pop())
    }
    return Antl.formatMessage(key, params)
  }
  Database.on('sql', console.log)
}
