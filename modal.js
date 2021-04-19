"use strict";

/**
 * DOM Selectors
 * @type {Element}
 */
const navbar = document.querySelector('.main-navbar');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll('.modal-btn');
const close_span = document.querySelectorAll('.close');
const formSub = document.getElementById('formSub');
const tournamentInput = document.getElementById('numberPlayed');
const checkbox = document.getElementsByClassName('checkbox-input');

const firstnameError = document.querySelector('#firstname + span.error');
const lastnameError = document.querySelector('#lastname + span.error');
const emailError = document.querySelector('#email + span.error');
const ageError = document.querySelector('#birthdate + span.error');
const numberPlayedError = document.querySelector('#numberPlayed + span.error');
const tcuError = document.querySelector('#tcu + span.error');

const firstname_input = document.getElementById('firstname');
const lastname_input = document.getElementById('lastname');
const email_input = document.getElementById('email');
const birthdate_input = document.getElementById('birthdate');
const city_checkbox = document.querySelectorAll('.checkbox-city[type=checkbox]');
const tcu_checkbox = document.getElementById('checkbox1');
const newsletter_checkbox = document.getElementById('checkbox2');

const modalBody_div = document.querySelector('.modal-body');

/**
 * Check if first and lastname contains specific character
 * Check if valid email
 * @type {RegExp}
 */
const nameReg = /^[a-zA-Z\- éèç]{2,}$/i;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Used in checkNumberPlayed()
 * to compare the number of tournament played & the number of checkbox checked
 * @type {number}
 */
let city = 0;

/**
 * We need those set to true for Form Validation
 * @type {boolean}
 */
let firstnameValid = false;
let lastnameValid = false;
let emailValid = false;
let is_13 = false;
let numberPlayedValid = false;
let tcuValid = false;
let newsLetterSubscribe = false; // optional

/**
 * Navbar expand / collapse
 */
function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    navbar.style.marginTop = '3rem';
  } else {
    x.className = "topnav";
    navbar.style.marginTop = 'unset';
  }
}

/**
 * Open Modal
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close Modal
 */
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Check firstname with regex & add/remove class
 */
function checkFirstname() {
  const firstname = formSub.firstname.value;

  if (!firstname.match(nameReg)) {
    firstnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux et contenir au moins 2 caractères.';
    formSub.firstname.classList.add('invalid');
    firstnameValid = false;
  } else {
    firstnameError.textContent = '';
    formSub.firstname.classList.remove('invalid');
    formSub.firstname.classList.add('valid');
    firstnameValid = true;
  }
}

/**
 * Check lastname with regex & add/remove class
 */
function checkLastname() {
  const lastname = formSub.lastname.value;

  if (!lastname.match(nameReg)) {
    lastnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux et contenir au moins 2 caractères.';
    formSub.lastname.classList.add('invalid');
    lastnameValid = false;
  } else {
    lastnameError.textContent = '';
    formSub.lastname.classList.remove('invalid');
    formSub.lastname.classList.add('valid');
    lastnameValid = true;
  }
}

/**
 * Check email with regex & add/remove class
 */
function checkEmail() {
  let email = formSub.email.value;

  if (!email.match(emailRegex)) {
    emailError.textContent = 'Veuillez entrer une adresse mail valide.';
    formSub.email.classList.add('invalid');
    emailValid = false;
  } else {
    emailError.textContent = '';
    formSub.email.classList.remove('invalid');
    formSub.email.classList.add('valid');
    emailValid = true;
  }
}

/**
 * Check Date
 * @type {Date}
 */
function checkAge() {
  let date = formSub.birthdate.value;
  let checkAge = date.trim();
  let y = parseInt(checkAge.substring(0,4));
  let m = parseInt(checkAge.substring(5,8));
  let d = parseInt(checkAge.substring(8,11));
  let today = new Date();

  if (isNaN(Date.parse(date))) {
    console.log('not a date');
    formSub.birthdate.classList.add('invalid');
    formSub.birthdate.classList.remove('valid');
    ageError.textContent = 'Vous devez saisir une date';
  }

  let age = today.getFullYear() - y;

  if ((today.getMonth() +1) < m) {
    age--;
  }
  if ( (today.getMonth() +1) == m && today.getDate() < d) {
    age--;
  }

  if (age >= 13) {
    formSub.birthdate.classList.add('valid');
    formSub.birthdate.classList.remove('invalid');
    ageError.textContent = '';
    is_13 = true;
  } else {
    formSub.birthdate.classList.remove('valid');
    formSub.birthdate.classList.add('invalid');
    ageError.textContent = 'Vous devez avoir au moins 13 ans'
    is_13 = false;
  }
}

/**
 * Check the number of tournament played and the number of city picked
 * Return false if the user select more cities than tournament played
 */
function checkNumberPlayed() {
  let numberPlayed = formSub.numberPlayed.value;

  formSub.numberPlayed.classList.remove('invalid');
  formSub.numberPlayed.classList.add('valid');
  numberPlayedError.textContent = '';
  numberPlayedValid = true;

  if (numberPlayed < city) {
    numberPlayedError.textContent = 'Vous devez vérifier le nombre de tournoi ou les villes sélectionnées';
    formSub.numberPlayed.classList.remove('valid');
    formSub.numberPlayed.classList.add('invalid');
    numberPlayedValid = false;
  }

  if (city === 0 && numberPlayed > 0) {
    numberPlayedError.textContent = 'Vous devez vérifier le nombre de tournoi ou les villes sélectionnées';
    formSub.numberPlayed.classList.remove('valid');
    formSub.numberPlayed.classList.add('invalid');
    numberPlayedValid = false;
  }

  if (city > 0 && numberPlayed === 0) {
    numberPlayedError.textContent = 'Vous devez vérifier le nombre de tournoi ou les villes sélectionnées';
    formSub.numberPlayed.classList.remove('valid');
    formSub.numberPlayed.classList.add('invalid');
    numberPlayedValid = false;
  }
}

/**
 * Check tcu
 * @type {checkbox}
 */
function checkTcu() {
  if (tcu_checkbox.checked === false) {
    tcuError.textContent = 'Vous devez accepter les termes et conditions.';
    tcuValid = false;
  } else {
    tcuError.textContent = '';
    tcuValid = true;
  }
}

/***
 * Check newsletter
 * @type {checkbox}
 */
function checkNewsletter() {
  newsLetterSubscribe = newsletter_checkbox.checked === true;
}

/**
 * Render 2nd page of the modal when the form is submit (and valid)
 */
function renderValidation() {
  formSub.style.display = 'none';
  const content = document.createElement('div');
  content.classList.add('content');
  modalBody_div.appendChild(content);

  const modal2 = document.createElement('div');
  modal2.classList.add('modal-body', 'modal-confirm');
  modal2.textContent = 'Merci, votre réservation est enregistrée !';
  content.appendChild(modal2);

  const modal2_btn = document.createElement('button')
  modal2_btn.classList.add('button', 'btn-submit');
  modal2_btn.textContent = 'Fermer';
  modal2_btn.addEventListener('click', () => {
    closeModal();
    modalBody_div.removeChild(content);
    formReset();
  });
  content.appendChild(modal2_btn);
}

/**
 * Reset form and city to 0
 */
function formReset() {
  city = 0;
  formSub.reset();
  formSub.style.display = 'block';
  formSub.firstname.classList.remove('valid');
  formSub.lastname.classList.remove('valid');
  formSub.email.classList.remove('valid');
  formSub.birthdate.classList.remove('valid');
  formSub.numberPlayed.classList.remove('valid');
}

/**
 * Events Listener
 * Open & Close modal
 * Check inputs & call functions
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

close_span.forEach((x) => x.addEventListener('click', () => {
  closeModal();
}));

firstname_input.addEventListener('input', () => {
  checkFirstname();
});

lastname_input.addEventListener('input', () => {
  checkLastname();
});

email_input.addEventListener('input', () => {
  checkEmail();
});

birthdate_input.addEventListener('input', () => {
  checkAge();
});

/**
 * Update city value
 */
city_checkbox.forEach((checkbox) => checkbox.addEventListener('change', () => {
  checkbox.checked ? city++ : city--;
}));

/**
 * Reset checkbox if input tournament = 0
 */
tournamentInput.addEventListener('change', () => {
  if (formSub.numberPlayed.value === '0') {
    for (let i = 0; i < checkbox.length -2; i++) {
      checkbox[i].checked = false;
      formSub.numberPlayed.classList.remove('invalid');
      numberPlayedError.textContent = '';
    }
  }
});

/**
 * Check newsletter
 */
newsletter_checkbox.addEventListener('change', () => {
  checkNewsletter();
});

/**
 * Form Submit
 */
formSub.addEventListener('submit', (e) => {
  e.preventDefault();
  checkFirstname();
  checkLastname();
  checkEmail();
  checkAge();
  checkNumberPlayed();
  checkTcu();
  checkNewsletter();

  if (firstnameValid && lastnameValid && emailValid && is_13 && numberPlayedValid && tcuValid) {
    renderValidation();
  } else {
    console.error('error form');
    return false;
  }

});





