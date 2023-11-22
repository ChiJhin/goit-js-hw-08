import throttle from 'lodash.throttle';
import stor from './storage';

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

const storage = {};

function onInputSave({ target }) {
  storage[target.name] = target.value;
  stor.save(STORAGE_KEY, storage);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.target;

  if (!email.value || !message.value) {
    return alert('Заповніть форму!!!');
  }
  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);
  form.reset();
  stor.remove(STORAGE_KEY);
  delete storage.email;
  delete storage.message;
}

form.addEventListener('input', throttle(onInputSave, 500));
form.addEventListener('submit', onFormSubmit);

const savedStorage = stor.save(STORAGE_KEY);

checkForm();

function checkForm() {
  if (savedStorage) {
    email.value = savedStorage.email;
    message.value = savedStorage.message;
  }
}
