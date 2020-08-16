const API_KEY = "4f1f18891fd0821ced04cb5f02b3d316";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
   fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
   )
      .then(function (response) {
         return response.json();
      })
      .then(function (json) {
         const temperature = json.main.temp;
         const place = json.name;
         weather.innerText = `${temperature} ℃ @ ${place}`;
      });
}

function saveCoords(coordsObj) {
   localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function geoSuccessHandler(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
      latitude,
      longitude,
   };
   saveCoords(coordsObj);
   getWeather(latitude, longitude);
}

function geoErrorHandler() {
   console.log("Can't access geolocation");
}
function askForCoords() {
   navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
}

function loadCoords() {
   const loadedCoords = localStorage.getItem(COORDS);
   if (loadedCoords == null) {
      askForCoords();
   } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
   }
}

function init() {
   loadCoords();
}

init();
