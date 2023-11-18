import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

const storage = {};

function onInputSave({ target }) {
  storage[target.name] = target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.target;

  if (!email.value || !message.value) {
    return alert('Заповніть форму!');
  }

  console.log(parsedStorage);
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  delete storage.email;
  delete storage.message;
}

form.addEventListener('input', throttle(onInputSave, 500));
form.addEventListener('submit', onFormSubmit);

const savedStorage = localStorage.getItem(STORAGE_KEY);

const parsedStorage = JSON.parse(savedStorage);

checkForm();

function checkForm() {
  if (savedStorage) {
    email.value = parsedStorage.email;
    message.value = parsedStorage.message;
  }
}
