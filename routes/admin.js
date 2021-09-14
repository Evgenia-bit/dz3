/* eslint-disable spaced-comment */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable'); 
const {skills}  = require('../data.json')
const db = require('../models/db')();

router.get('/', (req, res, next) => {
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
  res.render('pages/admin', { title: 'Admin page' , skills })
})

router.post('/skills', (req, res, next) => {
  console.log(req.body)
  if (!req.body.age || !req.body.concerts || !req.body.cities || !req.body.years) {
    // если что-либо не указано - сообщаем об этом
    return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
  }
  
  db.use('skillfs',11);
 // db.set('skillsа', req.body.age );
  db.save();
  return res.json({msg:'Данные успешно записаны!', status: 'OK'});
})

router.post('/upload', (req, res, next) => {
  const form = new formidable.IncomingForm(); // получаем данные с формы
  // eslint-disable-next-line spaced-comment
  const upload = path.join('./public', 'upload'); //определяем директорию для сохранения картинки

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload); //переносим картинку из временного хранилища в основное

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
    
  })
  return res.json({msg: 'Что-то пошло не так', status: "error"})

})

module.exports = router
