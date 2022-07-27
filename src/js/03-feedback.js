import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs ={
    form: document.querySelector('.feedback-form'),
    message : document.querySelector('.feedback-form textarea'),
    email : document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('input', throttle(onFormData, 500));
refs.form.addEventListener('submit', onFormSubmit);

const formData = {};

dataFromLocalStorage();

function onFormData(e){
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit (e){
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function dataFromLocalStorage() {
    const data =  JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(data){
        refs.email.value = data.email;
        refs.message.value = data.message;
        console.log(data);
    }
  };