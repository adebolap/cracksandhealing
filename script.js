const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#nav-links');
const year = document.querySelector('#year');
const signup = document.querySelector('.signup');
const email = document.querySelector('#email');
const formNote = document.querySelector('#form-note');

year.textContent = new Date().getFullYear();

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

links.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

signup.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!email.validity.valid) {
    formNote.textContent = 'Please enter a valid email address so we can keep you encouraged.';
    formNote.classList.add('is-error');
    email.focus();
    return;
  }

  formNote.textContent = 'Thank you—your encouragement note is ready to be connected to an email service.';
  formNote.classList.remove('is-error');
  signup.reset();
});
