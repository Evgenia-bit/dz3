
function prepareSendProd(e) {
    e.preventDefault();
    const files = form.querySelector('[name=photo]').files;

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('avatar', files[0]);
    
  
    const resultContainer = form.querySelector('.status');
    resultContainer.innerHTML = 'Sending...';
    sendJson('/admin/upload', formData, 'POST', (data) => {
      form.reset();
      resultContainer.innerHTML = data.msg; 
    });
}
  
function sendJson (url, data, method, cb) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = function (e) {
      let result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        // eslint-disable-next-line node/no-callback-literal
        cb({msg: 'Извините в данных ошибка', status: 'Error'});
      }
      cb(result);
    };
    xhr.send(JSON.stringify(data));
}
  
const form = document.querySelector('#prod');
form.addEventListener('submit', prepareSendProd); 