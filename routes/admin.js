
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable'); 
const {skills}  = require('../data.json')
const db = require('../models/db')();

router.get('/', (req, res, next) => {
  res.render('pages/admin', { title: 'Admin page' , skills })
})

router.post('/skills', (req, res, next) => {
  let age = req.body.age;
  let concerts = req.body.concerts;
  let cities = req.body.cities;
  let years = req.body.years;
  if (!age || !concerts || !cities || !years) {
    return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
  }
  
  db.set('skills:0:number', Number(age) );
  db.set('skills:1:number', Number(concerts) );
  db.set('skills:2:number', Number(cities) );
  db.set('skills:3:number', Number(years) );
  db.save()
  return res.json({msg:'Данные успешно изменены!', status: 'OK'});

})

router.post('/upload', (req, res, next) => {
  console.log(req);
  var form   =  new formidable.IncomingForm();
  console.log(req.file);
  form.parse(req,function(err,fields,files){
      console.log(files);
     // util.inspect({fields: fields, files: files});
  });
  

/*
  form.parse(req, function (err, fields, files) { //парсим данные с формы
    console.log(fields, files)
    if (err) {
      return next(err);
    }
    if (files.photo.name === '' || files.photo.size === 0) { //если нет имени или размера
      fs.unlink(files.photo.path); //удаляем файл из дериктории
      return res.json({msg: 'Картинка не загружена', status: "error"})
    } else {
      return res.json({msg: 'лялялял', status: "OK"})
    }
    
  })*/
  return res.json({msg: 'Что-то пошло не так', status: "error"})

})

module.exports = router
