"use strict";

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll('.modal-btn');
const close_span = document.querySelector('.close');
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
const tcu_checkbox = document.getElementById('checkbox1');

const city_checkbox = document.querySelectorAll('.checkbox-city[type=checkbox]');

//TODO FIX REGEX
const nameReg = /[\d@~°\\./!&$`€*]/;
let city = 0;

let firstnameValid = false;
let lastnameValid = false;
let emailValid = false;
let is_13 = false;
let numberPlayedValid = false;
let tcuValid = false;

const errorMsg = [
  "Veuillez entrer 2 caractères minimum.",
  "Veuillez entrer une adresse mail valide."
];

function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

function checkFirstname() {
  const firstname = formSub.firstname.value;

  if (firstname.match(nameReg)) {
    firstnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux';
    formSub.firstname.classList.add('invalid');
    firstnameValid = false;
  }

  if (firstname.length < 2 ) {
    firstnameError.textContent = errorMsg[0];
    formSub.firstname.classList.add('invalid');
    firstnameValid = false;
  } else {
    firstnameError.textContent = '';
    formSub.firstname.classList.remove('invalid');
    formSub.firstname.classList.add('valid');
    firstnameValid = true;
  }
}

function checkLastname() {
  const lastname = formSub.lastname.value;

  if (lastname.match(nameReg)) {
    lastnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux';
    formSub.lastname.classList.add('invalid');
    lastnameValid = false;
  }
  if (lastname.length < 2 ) {
    lastnameError.textContent = errorMsg[0];
    formSub.lastname.classList.add('invalid');
    lastnameValid = false;
  } else {
    lastnameError.textContent = '';
    formSub.lastname.classList.remove('invalid');
    formSub.lastname.classList.add('valid');
    lastnameValid = true;
  }
}

function checkEmail() {
  let email = formSub.email.value;
  // let validRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.match(emailRegex)) {
    emailError.textContent = errorMsg[1];
    formSub.email.classList.add('invalid');
    emailValid = false;
  } else {
    emailError.textContent = '';
    formSub.email.classList.remove('invalid');
    formSub.email.classList.add('valid');
    emailValid = true;
  }
}

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

function checkNumberPlayed() {
  const numberPlayed = formSub.numberPlayed.value;

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

  if (city > 0 && numberPlayed === 0) {
    console.error('check number');
    formSub.numberPlayed.classList.remove('valid');
    formSub.numberPlayed.classList.add('invalid');
    numberPlayedValid = false;
  }
}

function checkTcu() {
  if (tcu_checkbox.checked === false) {
    tcuError.textContent = 'Vous devez accepter les termes et conditions.';
    tcuValid = false;
  } else {
    tcuError.textContent = '';
    tcuValid = true;
  }
}

// for 2nd page modal
// modalbg.innerHTML = `<p>test</p>`;


// Events Listener

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
close_span.addEventListener('click', () => {
  closeModal();
});

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

city_checkbox.forEach((checkbox) => checkbox.addEventListener('click', () => {
  checkbox.checked ? city++ : city--;
}));

// reset checkbox if input tournament = 0
tournamentInput.addEventListener('change', () => {
  if (formSub.numberPlayed.value === '0') {
    for (let i = 0; i < checkbox.length -2; i++) {
      checkbox[i].checked = false;
      formSub.numberPlayed.classList.remove('invalid');
      numberPlayedError.textContent = '';
    }
  }
});

// form submit
formSub.addEventListener('submit', (e) => {
  e.preventDefault();
  checkFirstname();
  checkLastname();
  checkEmail();
  checkAge();
  checkNumberPlayed();
  checkTcu();

  if (firstnameValid && lastnameValid && emailValid && is_13 && numberPlayedValid && tcuValid) {
    alert('form ok => submit');
  } else {
    console.error('error form');
    return false;
  }

});


