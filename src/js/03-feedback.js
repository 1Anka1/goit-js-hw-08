import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    email: document.querySelector('.feedback-form input[type=email]'),
}
const input = refs.form.elements;
const LOKALSTORAGE_KEY = 'feedback-form-state';
const savedData = localStorage.getItem(LOKALSTORAGE_KEY);
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onInput, 500));
refs.textarea.addEventListener('input', throttle(onInput, 500));

function inputValue () {
  formData.email = input.email.value;
  formData.message = input.message.value;
}

if (savedData) {
    const formData = JSON.parse(savedData);
    refs.email.value = formData.email;
    refs.textarea.value = formData.message;
}

function onInput(event) {
   inputValue();
    localStorage.setItem(LOKALSTORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(event) {
    event.preventDefault();
    inputValue();
    if (input.email.value === '' || input.message.value === '') {
        alert('Заповни будь-ласка поля!');
    } else {
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(LOKALSTORAGE_KEY);
    }
}