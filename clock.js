const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
   const date = new Date();
   const minutes = date.getMinutes();
   const hours = date.getHours();
   const seconds = date.getSeconds();
   clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
   }`;
}

function clockStyle() {
   clockTitle.style.fontSize = "150px";
   clockTitle.style.fontWeight = "bold";
   clockTitle.style.marginTop = "150px";
   clockTitle.style.color = "white";
}

function init() {
   clockStyle();
   getTime();
   setInterval(getTime, 1000);
}

init();
