//!

//!   Student Name: Kritish Dhakal
//!   Student ID: 2408573

//!  

//? Api Key
let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search button");


//? Creating a object literal
let weather = {
  //? getting the weather data
  fetchWeather: function (city) {
    fetch(`weather.php?city=${city}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch(() => this.notFound());
  },

  //? function to display the weather data in html using dom
  displayWeather: function (data) {

    const date = new Date(data.last_updated);
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

    console.log(`${data.city}:`, data);
    document.querySelector(".city").innerHTML = `${data.city}, ${data.country}`;
    document.querySelector(".description").innerHTML = data.weather_description;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${data.icon}.png`; //? Putting the description suitable icon //
    document.querySelector(".temp").innerHTML = `${Math.round(data.temperature)}°C`;
    document.querySelector(".humidity").innerHTML = `<b>Humidity</b>: ${data.humidity}%`;
    document.querySelector(".pressure").innerHTML = `<b>Pressure</b>: ${data.pressure}Pa`;
    document.querySelector(".wind").innerHTML = `<b>Wind Speed</b>: ${data.wind_speed}km/h`;
    document.querySelector(".dateTime").innerHTML = `${dateTime}`;

    //? Getting a image of the city from unsplash link
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${data.city}')`;
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