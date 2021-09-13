const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer'); // модуль для отправки писем на почту
const { products, skills } = require('../data.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
   // требуем наличия имени, обратной почты и текста
   if (!req.body.name || !req.body.email || !req.body.message) {
    // если что-либо не указано - сообщаем об этом
    return res.json({msg:'Все поля нужно заполнить!', status: 'Error'});
  }
  // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "ev.mo4alina@yandex.ru", // generated ethereal user
      pass: "Evilah07695214" // generated ethereal password
    }
  });
  console.log(transporter)
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: "ev.mo4alina@yandex.ru",
    subject: 'Домашка 3',
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };
  
  // отправляем почту
  transporter.sendMail(mailOptions, function(error, info) {
    // если есть ошибки при отправке - сообщаем об этом
    if (error) {
      
      return res.json({msg:`При отправке письма произошла ошибка!: ${error}`, status: 'Error'});
    }
    
    res.json({msg:'Письмо успешно отправлено!', status: 'Ok'});
  });
  
})

module.exports = router
