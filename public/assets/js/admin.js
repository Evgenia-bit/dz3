
function prepareSend(e, form, data, url) {
    e.preventDefault();
    
    console.log(data)
    const resultContainer = form.querySelector('.status');
    resultContainer.innerHTML = 'Sending...';
    
    sendJson(url, data, 'POST', (data) => {
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
  
const formProd = document.querySelector('#prod');
const formSkills = document.querySelector('#skills');


formSkills.addEventListener('submit', e => {
  const data = {
    age: formSkills.age.value,
    concerts: formSkills.concerts.value,
    cities: formSkills.cities.value,
    years: formSkills.years.value
  };

  prepareSend(e, formSkills, data, '/admin/skills');
}); 
//formSkills.addEventListener('submit'); 
