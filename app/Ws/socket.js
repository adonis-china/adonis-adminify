'use strict'

/*
|-----------------------------------------------------------------------------
| Web Socket
|-----------------------------------------------------------------------------
|
| WebSocket provider makes it so simple for you to write realtime applications
| with the power of channels and dynamic rooms. Make use of this file to
| define channels and bind controllers next to them.
|
|
| @example
| Ws.channel('/chat', 'ChatController')
*/

const Ws = use('Ws')

const Mock = require('mockjs')

Ws.channel('/chat', function (socket) {

  socket.on('message', function * (payload) {
    const name = Mock.mock('@name')
    console.log('message: ' +payload)
    socket.toEveryone().emit('message', {
      avatar: Mock.Random.image('80x80', Mock.mock('@color'), '#fff', name.substr(0, 1)),
      title: name,
      time: new Date(),
      subtitle: payload
    })
  })
  
})

Ws.channel('/system', (socket) => {
  socket.on('menu', function * (payload) {

  })
})