//for searching weather of city entered by user
let now = new Date();
//create an array for days
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novermeber",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let Day = document.querySelector(".Day");
Day.innerHTML = `${day}, ${month} ${date}`;
let Time = now.getHours();
let time = document.querySelector(".time");
let Minutes = now.getMinutes();
time.innerHTML = `${Time}:${Minutes}`;

// to display the weather conditions
  function displayWeather(response){
  //  console.log(response)
    let h1=document.querySelector("#place1");
    h1.innerHTML=`${response.data.name}`;
    let h2 =document.querySelector("#temp");
    h2.innerHTML=`${Math.round(response.data.main.temp)}`
    let h3=document.querySelector("#description-id");
    h3.innerHTML=`${response.data.weather[0].description}`
  }
// obtaining the value from the search element
function searchHandle(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let value = searchInput.value.trim();
  if(value.length==0){
    alert("Please enter the city");
  }
  searchPlace(value);
}
//API url updating 
function searchPlace(value){
  let key="8fe5e769240ed184b75fe9f9a9dd648e";
  let city = `${value}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

//function to search for geo location
function searchLocation(position) {
    let lat= position.coords.latitude;
    let lon= position.coords.longitude;
    let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
}
//function triggered when button is clicked
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//triggering the search submit action
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchHandle);
//triggering current button for adding geo-location
let currentDetails=document.querySelector("#current-id");
currentDetails.addEventListener("click",getCurrentLocation);
