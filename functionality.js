// function test() {
//   console.log("Test");
// }
// test();

//key for openWeatherMap
let keyApi = "f58aad1287150950fbe1a31a918b2f9f";

//selecting elements in DOM
let button = document.querySelector("#btn");
let inputText = document.querySelector(".search-bar");
let weather = document.querySelector(".weather");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let icon = document.querySelector(".icon");
let description = document.querySelector(".weather-description");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let wind = document.querySelector(".wind");
let country = document.querySelector(".country");

//getting request and answer from openWeatherMap API
function search() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputText.value +
      "&units=metric&appid=" +
      keyApi
  )
    .then((response) => response.json())
    .then((data) => {
      //Extracting values from json object
      let cityValue = data["name"];
      let tempValue = data["main"]["temp"];
      let [iconEl, descriptionValue] = [
        data["weather"][0]["icon"],
        data["weather"][0]["description"],
      ];
      let humidityValue = data["main"]["humidity"];
      let pressureValue = data["main"]["pressure"];
      let windValue = data["wind"]["speed"];
      let countryValue = data["sys"]["country"];

      //Atach values to DOM elements
      city.innerHTML = cityValue;
      temp.innerHTML = tempValue.toFixed(1);
      icon.src = iconEl.src =
        "https://openweathermap.org/img/wn/" + iconEl + "@2x.png";
      description.innerHTML = descriptionValue;
      humidity.innerHTML = "Humidity: " + humidityValue + "%";
      pressure.innerHTML = "Pressure: " + pressureValue + " hPa";
      wind.innerHTML = "Wind speed: " + windValue + " km/h";
      country.innerHTML = "Country: " + countryValue;
    })

    //trigerring alert if city is not found
    .catch((err) =>
      alert("Wrong city name!, Please press Esc key and try again!")
    );
}

//Adding event listenere for the search button
button.addEventListener("click", search);

//adding event listener for pressing ENT and ESC
inputText.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    search();
  } else if (event.key == "Escape") {
    document.querySelector(".search-bar").value = "";
  }
});
