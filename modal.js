"use strict";

function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const close_span = document.querySelector('.close');
const formSub = document.getElementById('formSub');
const tournamentInput = document.getElementById('numberPlayed');
const checkbox = document.getElementsByClassName("checkbox-input");

const firstnameError = document.querySelector('#firstname + span.error');
const lastnameError = document.querySelector('#lastname + span.error');
const emailError = document.querySelector('#email + span.error');
const numberPlayedError = document.querySelector('#numberPlayed + span.error');
const tcuError = document.querySelector('#tcu + span.error');

const firstname_input = document.getElementById('firstname');
const lastname_input = document.getElementById('lastname');
const email_input = document.getElementById('email');
const birthdate_input = document.getElementById('birthdate');
const tcu_checkbox = document.getElementById('checkbox1');

let numberPlayed = formSub.numberPlayed.value;



let nameReg = /[\d@~°\\./!&$`€*]/;
let testReg = /[a-zA-Z]*[^0-9]/;

let is_13 = false;

const errorMsg = [
  "Veuillez entrer 2 caractères minimum.",
  "Veuillez entrer une adresse mail valide.",
  "Vous devez sélectionner au moins une ville",
  "Vous devez vérifier le nombre de tournoi ou les villes sélectionnées",
  "Vous avez sélectionné plus de villes que de tournoi joués",
  "Vous devez accepter les termes et conditions."
];

birthdate_input.addEventListener('change', () => {
  let date = formSub.birthdate.value;
  let checkAge = date.trim();
  let y = parseInt(checkAge.substring(0,4));
  let m = parseInt(checkAge.substring(5,8));
  let d = parseInt(checkAge.substring(8,11));
  let today = new Date();

  if (isNaN(Date.parse(date))) {
    console.log('not a date');
    return false;
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
    is_13 = true;
  } else {
    formSub.birthdate.classList.remove('valid');
    formSub.birthdate.classList.add('invalid');
    is_13 = false;
  }

});


formSub.addEventListener('submit', (e) => {
  e.preventDefault();

  //
  checkFirstname();
  checkLastname();
  checkEmail();
  checkNumberPlayed();
  checkTcu();

  let lastname = formSub.lastname.value;

  if (lastname.match(nameReg)) {
    lastnameError.textContent = 'Le champ ne doit pas contenir de chiffres';
    formSub.lastname.classList.add('invalid');
    return false;
  }

  if (lastname.length < 2 ) {
    lastnameError.textContent = errorMsg[0];
    formSub.lastname.classList.add('invalid');
    return false;
  } else {
    lastnameError.textContent = '';
    formSub.lastname.classList.remove('invalid');
    formSub.lastname.classList.add('valid');
  }

  let email = formSub.email.value;
  let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/

  if (!email.match(emailRegex)) {
    emailError.textContent = errorMsg[1];
    formSub.email.classList.add('invalid');
    return false;
  } else {
    emailError.textContent = '';
    formSub.email.classList.remove('invalid');
    formSub.email.classList.add('valid');
  }

  // if (date === "[object Date]") {
  //   alert('date');
  // } else {
  //   alert ('not a date');
  // }

  // legal age
  if(is_13 === false) {
    return false;
  }

  let numberPlayed = formSub.numberPlayed.value;
  let city = 0;

  for (let i = 0; i < checkbox.length -2; i++) {
    if (checkbox[i].checked === true) {
      city++;
    }
  }
  if ((numberPlayed >= 1) && (city === 0)) {
    formSub.numberPlayed.classList.add('invalid');
    numberPlayedError.textContent = 'Vous devez sélectionner au moins une ville';
    return false;
  }

  if (city > numberPlayed) {
    numberPlayedError.textContent = errorMsg[3];
    formSub.numberPlayed.classList.add('invalid');
    return false;
  } else {
    numberPlayedError.textContent = '';
    formSub.numberPlayed.classList.remove('invalid');
    formSub.numberPlayed.classList.add('valid');
  }

  // if user set or delete the default value
  if (numberPlayed === "") {
    numberPlayed.value === 0;
  }

  if (tcu_checkbox.checked === false) {
    tcuError.textContent = errorMsg[5];
    return false;
  } else {
    tcuError.textContent = '';
  }

  let result = formSub.checkValidity();
    if (result === true) {
      alert(formSub.birthdate.value);
      alert('form valid ' + result);
    }

}); // end form submit


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

close_span.addEventListener('click', () => {
  closeModal();
});

function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

// for 2nd page modal
// modalbg.innerHTML = `<p>test</p>`;

function checkFirstname() {
  let firstname = formSub.firstname.value;

  if (firstname.match(nameReg)) {
    firstnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux';
    formSub.firstname.classList.add('invalid');
    return false;
  }

  if (firstname.length < 2 ) {
    firstnameError.textContent = errorMsg[0];
    formSub.firstname.classList.add('invalid');
    return false;
  } else {
    firstnameError.textContent = '';
    formSub.firstname.classList.remove('invalid');
    formSub.firstname.classList.add('valid');
  }
}

function checkLastname() {
  let lastname = formSub.lastname.value;

  if (lastname.match(nameReg)) {
    lastnameError.textContent = 'Le champ ne doit pas contenir de chiffres ou de caractères spéciaux';
    formSub.lastname.classList.add('invalid');
    return false;
  }

  if (lastname.length < 2 ) {
    lastnameError.textContent = errorMsg[0];
    formSub.lastname.classList.add('invalid');
    return false;
  } else {
    lastnameError.textContent = '';
    formSub.lastname.classList.remove('invalid');
    formSub.lastname.classList.add('valid');
  }
}

function checkEmail() {
  let email = formSub.email.value;
  // let validRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.match(emailRegex)) {
    emailError.textContent = errorMsg[1];
    formSub.email.classList.add('invalid');
    return false;
  } else {
    emailError.textContent = '';
    formSub.email.classList.remove('invalid');
    formSub.email.classList.add('valid');
  }
}

// function checkAge() {
//
// }

function checkNumberPlayed() {
  let numberPlayed = formSub.numberPlayed.value;
  let city = 0;

  for (let i = 0; i < checkbox.length -2; i++) {
    if (checkbox[i].checked === true) {
      city++;
    }
  }

  if (numberPlayed > city) {
    numberPlayedError.textContent = errorMsg[3];
    formSub.numberPlayed.classList.add('invalid');
    return false;
  } else {
    numberPlayedError.textContent = '';
    formSub.numberPlayed.classList.remove('invalid');
    formSub.numberPlayed.classList.add('valid');
  }

}

function checkTcu() {
  if (tcu_checkbox.checked === false) {
    tcuError.textContent = errorMsg[6];
    return false;
  } else {
    tcuError.textContent = '';
  }
}


// Events Listener

firstname_input.addEventListener('input', () => {
  checkFirstname();
});

lastname_input.addEventListener('input', () => {
  checkLastname();
});

email_input.addEventListener('input', () => {
  checkEmail();
});

// reset checkbox if input tournament = 0
tournamentInput.addEventListener('change', () => {
  if (formSub.numberPlayed.value === '0') {
    for (let i = 0; i < checkbox.length -2; i++) {
      checkbox[i].checked = false;
      numberPlayedError.textContent = '';
    }
  }
});

