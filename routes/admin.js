/* eslint-disable spaced-comment */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable'); 

router.get('/', (req, res, next) => {
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
  res.render('pages/admin', { title: 'Admin page' })
})

router.post('/skills', (req, res, next) => {
  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
  res.send('Реализовать сохранение нового объекта со значениями блока скиллов')
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
