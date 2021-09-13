/* eslint-disable eqeqeq */
const express = require('express')
const router = express.Router()
const config = require('../config.json')

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  if ( !req.body.email || !req.body.pass) {
    // если что-либо не указано - сообщаем об этом
    return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
  }
  
  if( config.login.email == req.body.email &&  config.login.pass == req.body.pass) {
    return res.json({msg:'Успешно!', status: 'ОК', redirect: '/admin'});
  } else {
    return res.json({msg:'Данные не верны!', status: 'Error'});
  }
  
})

module.exports = router
