/* eslint-disable node/no-callback-literal */
function prepareSendLogin(e) {
    e.preventDefault();
    const data = {
      email: formLogin.email.value,
      pass: formLogin.password.value
    };
  
    const resultContainer = formLogin.querySelector('.status');
    resultContainer.innerHTML = 'Sending...';
    sendJson('/login', data, 'POST', (data) => {
      formLogin.reset();
      resultContainer.innerHTML = data.msg;
      if(data.redirect) window.location.href = data.redirect;
      
    });
}
  
function sendJson (url, data, method, cb) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      let result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        cb({msg: 'Извините в данных ошибка', status: 'Error'});
      }
      cb(result);
    };
    xhr.send(JSON.stringify(data));
}
  
const formLogin = document.querySelector('#login');
formLogin.addEventListener('submit', prepareSendLogin);