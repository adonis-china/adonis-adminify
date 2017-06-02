'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')
const Mock = require('mockjs')
const Random = Mock.Random
const mock = Mock.mock

/*
|--------------------------------------------------------------------------
| User Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for User Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/
Factory.blueprint('App/Model/User', () => {
  return {
    username: mock('@string("lower", 6)'),
    nickname: mock('@name'),
    mobile: mock(/1[358]\d{9}/),
    email: mock('@email'),
    avatar: Random.image('128x128'),
    password: '123456',
    created_at: mock('@datetime'),
    updated_at: mock('@datetime'),
  };

})

Factory.blueprint('App/Model/Post', () => {
  return {
    user_id: mock('@integer(1,10)'),
    type_id: mock('@integer(1,4)'),
    title: mock('@title'),
    body: mock('@paragraph(1, 3)'),
    published_at: mock('@datetime'),
    created_at: mock('@datetime'),
    updated_at: mock('@datetime'),
  };

})

Factory.blueprint('App/Model/Comment', () => {
  return {
    user_id: mock('@integer(1,10)'),
    post_id: mock('@integer(1,20)'),
//    reply_id: mock('@integer(1,100)'),
    body: mock('@sentence'),
    created_at: mock('@datetime'),
    updated_at: mock('@datetime'),
  };
})


Factory.blueprint('App/Model/Tag', () => {
  return {
    user_id: mock('@integer(1,5)'),
    name: mock('@title(2, 4)')
  };
})

Factory.blueprint('App/Model/Type', () => {
  return {
    name: mock('@title(2, 4)')
  };
})



