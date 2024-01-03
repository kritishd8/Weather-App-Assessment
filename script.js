//!

//!   Student Name: Kritish Dhakal
//!   Student ID: 2408573

//!  

//? Api Key
const apiKey = "fec81edd16e193e514c606bf1b80293e";
let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search button");


// Creating a object literal
let weather = {
  //? getting the weather data
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((err) => this.notFound())
  },

  //? function to display the weather data in html using dom
  displayWeather: function (data) {

    const date = new Date(data.dt * 1000);
    //? Converting the date to "Dec 29, 2023" format
    const dateTime = date.toLocaleDateString(
      "en-US", 
      { day: 'numeric',
        month: 'short', 
        year: 'numeric', 
      });  

    //? Hiding the not found text and making sure the weather information is visible
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.not-found').style.display = 'none';  

    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; //? Putting the description suitable icon //
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `<b>Humidity</b>: ${data.main.humidity}%`;
    document.querySelector(".pressure").innerHTML = `<b>Pressure</b>: ${data.main.pressure}Pa`;
    document.querySelector(".wind").innerHTML = `<b>Wind Speed</b>: ${data.wind.speed}km/h`;
    document.querySelector(".dateTime").innerHTML = `${dateTime}`;

    //? Getting a image of the city from unsplash link
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${data.name}')`;
  },

  //? Search function
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  //? 404 Not Found // Error
  notFound: function(err){
    //? Hiding weather information and displaying not found message
    document.querySelector('.weather').style.display = 'none';
    document.querySelector('.not-found').style.display = 'block';
    document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1650692201357-3b1b15469952?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  },

};

//? Search when btn is clicked
document.querySelector(".search button").addEventListener("click", () => {
  if (searchBar.value != ''){
    weather.search();
    searchBar.value = '';
  }
});

//? Search when Enter key is pressed
document.querySelector(".search-bar").addEventListener("keypress", (event) => {
  if (event.key == "Enter" && searchBar.value != '') {
    weather.search();
    searchBar.value = '';
  }
}); 

//? Default location
weather.fetchWeather("Nagaon");