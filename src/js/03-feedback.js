import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const storage = {};

updateForm();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  storage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.target;

  if (!email.value || !message.value) {
    return window.alert('Заповніть форму!');
  }
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  delete storage.email;
  delete storage.message;
}

function updateForm() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedForm);

  Object.entries(savedForm).forEach(([name, value]) => {
    storage[name] = value;
    form.elements[name].value = value;
  });
}
