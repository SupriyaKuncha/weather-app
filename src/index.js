
function formatCurrentTime(timestamp) {
    let now = new Date(timestamp * 1000);
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
    let day = days[now.getDay()];
    //time calculation 
    let greetTime = document.querySelector(".time");
    let timeUpdate = document.querySelector("#time");
    let greeting = document.querySelector(".greeting");
    let minutes = now.getMinutes();
    let greetImage = document.querySelector("#greet-image");
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let hours = now.getHours();
    if (hours) {
        
    }
    if (hours < 10) {
        hours = `0${hours}`;
        greetImage.src="img/sunrise_1.svg"
        greeting.innerHTML = `Good Morning`;
        greetTime.innerHTML = `${day}, ${hours}:${minutes} AM`;
        timeUpdate.innerHTML = `${day}, ${hours}:${minutes} AM`;
    }else if (hours >=12&&hours<=17) {
        hours = (hours - 12);
        hours = `0${hours}`;
        greetImage.src="img/sun.svg"
        greeting.innerHTML = `Good Afternoon`;
        greetTime.innerHTML = `${day}, ${hours}:${minutes} PM`;
        timeUpdate.innerHTML = `${day}, ${hours}:${minutes} PM`;
    } else {
        hours = (hours - 12);
        hours = `${hours}`;
        greeting.innerHTML = `Good Evening`;
        greetImage.src="img/sunset.svg"
        greetTime.innerHTML = `${day}, ${hours}:${minutes} PM`;
        timeUpdate.innerHTML = `${day}, ${hours}:${minutes} PM`;
    }
}
function displayWeather(response) {
  //updating with current position using geo loc
  let currentPlace = document.querySelector("h1");
  currentPlace.innerHTML = `${response.data.city}`;
  let conditionDescription = document.querySelector(".condition");
//   conditionDescription.innerHTML = ` ${response.data.condition.description}`;
  conditionDescription = document.querySelector(".weather-feel");
  conditionDescription.innerHTML = ` ${response.data.condition.description}`;
  conditionDescription = document.querySelector(".weather-feel-right");
  conditionDescription.innerHTML = ` ${response.data.condition.description}`;
  let temperature = document.querySelector(".celcius-number");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
  temperature = document.querySelector(".celcius-number-right");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
    let temperatureInFahrenheit = temperatureConvert(temperature.innerHTML);
    let fahrenheitNumber = document.querySelector(".fahrenheit-number");
    fahrenheitNumber.innerHTML = `${Math.round(temperatureInFahrenheit)}`;
    let feelsLike = document.querySelector(".feel");
    feelsLike.innerHTML = `Feel's like ${Math.round(response.data.temperature.feels_like)}°C`
    formatCurrentTime(response.data.time)
    let imageUpdate = document.querySelector(".image-update");
    let imageUrl = response.data.condition.icon_url;
    imageUpdate.innerHTML = `<img src="${imageUrl}" alt="Weather icon">`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML=`${response.data.temperature.humidity}%`
    let wind = document.querySelector("#wind");
    wind.innerHTML=`${response.data.wind.speed}Km/h`
    
}
function temperatureConvert(c) {
  let f;

  f = c * (9 / 5) + 32;
  return f;
}
//function to Update API  for current loation access
function searchLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
  let key = "54327ccdb4a4b1c7a56a1f4tb0b7od68";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}
//function triggered when button is clicked
function getCurrentLocationDetails(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//custom API for giving search results
function searchPlace(value) {
  let key = "54327ccdb4a4b1c7a56a1f4tb0b7od68";
  let query = `${value}`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function searchHandle(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let value = searchInput.value.trim();
  if (value.length === 0) {
    alert("Please enter the city 🙌");
  }
  searchPlace(value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchHandle);

let currentPosition = document.querySelector("#current-id");
currentPosition.addEventListener("click", getCurrentLocationDetails);
