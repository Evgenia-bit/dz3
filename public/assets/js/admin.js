
function prepareSend(e, form, data, url) {
    e.preventDefault();


    data = new FormData();
    data.append('files', form.photo.files[0]);

    const resultContainer = form.querySelector('.status');
    resultContainer.innerHTML = 'Sending...';
    
    sendJson(url, data, 'POST', (result) => {
      form.reset();
      resultContainer.innerHTML = result.msg; 
      if(form.getAttribute('id') == 'skills') {
        let formElements = form.elements;
        for (var i = 0; i< formElements.length; i++) {
          formElements[i].value = data[formElements[i].name];  
        } 
      } 
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

formProd.addEventListener('submit', e => {
  

  const data = {
    photo: formProd.photo.files[0],
    name: formProd.name.value,
    price: formProd.price.value
  };
  prepareSend(e, formProd, data, '/admin/upload');
});
//formSkills.addEventListener('submit'); 
