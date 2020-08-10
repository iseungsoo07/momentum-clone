const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(name) {
   localStorage.setItem(USER_LS, name);
}

function submitHandler(event) {
   event.preventDefault();
   const currentValue = input.value;
   paintGreeting(currentValue);
   saveName(currentValue);
}

function askForName() {
   form.classList.add(SHOWING_CN);
   form.addEventListener("submit", submitHandler);
}

function paintGreeting(name) {
   form.classList.remove(SHOWING_CN);
   greeting.classList.add(SHOWING_CN);
   greeting.innerText = `Hello ${name}`;
}

function loadName() {
   const currentUser = localStorage.getItem(USER_LS);
   if (currentUser != null) {
      paintGreeting(currentUser);
   } else {
      askForName();
   }
}

function init() {
   loadName();
}

init();
