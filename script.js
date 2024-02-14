//!

//!   Student Name: Kritish Dhakal
//!   Student ID: 2408573

//!  

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search button");
const historicalWeatherDiv = document.querySelector('.historical-weather');


let weather = {
  //? Function to fetch and update weather data
  fetchAndUpdateWeather: function(city) {
    fetch(`weather.php?city=${city.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(city.toLowerCase(), JSON.stringify(data));
        this.displayWeather(data);
      })
      .catch(() => this.notFound());
  },

  //? Fetch weather data function
  fetchWeather: function(city) {
    const cachedData = localStorage.getItem(city.toLowerCase());
    if (cachedData) {
      const data = JSON.parse(cachedData);
      const cachedDate = new Date(data.currentData.last_updated).toLocaleDateString(); //? Extracting the date from cached data
      const currentDate = new Date().toLocaleDateString(); //? Getting current date

      //? Check if the cached data date is not today
      if (cachedDate !== currentDate) {
        this.fetchAndUpdateWeather(city);
      } else {
        this.displayWeather(data);
      }
    } else {
      //? No cached data found, fetch new data
      this.fetchAndUpdateWeather(city);
    }
  },

  //? Display weather data function
  displayWeather: function(data) {
    //? Converting the date to 01 Jan 2024 format
    const date = new Date(data.currentData.last_updated);
    const dateTime = date.toLocaleDateString(
      "en-US", 
      { day: 'numeric',
        month: 'short', 
        year: 'numeric', 
      });  

    //? Gets country name from short form
    const countryName = new Intl.DisplayNames(['en'], {type: 'region'}).of(data.currentData.country);

    //? Hiding the not found text and making sure the weather information is visible
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.not-found').style.display = 'none';  

    console.log(`${data.currentData.city}:`, data);

    document.querySelector(".city").innerHTML = `${data.currentData.city}, ${countryName}`;
    document.querySelector(".description").innerHTML = data.currentData.weather_description;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${data.currentData.icon}.png`;
    document.querySelector(".temp").innerHTML = `${Math.round(data.currentData.temperature)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.currentData.humidity}%`;
    document.querySelector(".pressure").innerHTML = `${data.currentData.pressure}Pa`;
    document.querySelector(".wind").innerHTML = `${data.currentData.wind_speed}km/h`;
    document.querySelector(".dateTime").innerHTML = `${dateTime}`;

    //? Getting a image of the city from unsplash link
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${data.currentData.city},${data.currentData.country}')`;

    //? Display or hide the historical-weather div based on the city    
    if (data.currentData.city.toLowerCase() === 'nagaon') {
      historicalWeatherDiv.style.display = 'block';

      historicalWeatherDiv.innerHTML = '';

      historicalWeatherDiv.innerHTML =`
        <div class="historical-item">
          <p class="historical-day"><strong>Date</strong></p>
          <p class="historical-temp"><strong>Temp</strong></p>
          <p class="historical-humidity"><strong>Humidity</strong></p>
          <p class="historical-pressure"><strong>Pressure</strong></p>
          <p class="historical-windspeed"><strong>Wind Speed</strong></p>
        </div>`;

        //? Using a forEach to loop through all the objects inside the sevenDaysData array and display it
        data.sevenDaysData.forEach(dayData => {
        const historicalItem = document.createElement('div');
        historicalItem.classList.add('historical-item');
        historicalItem.classList.add('historical-data');

        const historicalDate = new Date(dayData.date);
        const historicalDateTime = historicalDate.toLocaleDateString(
          "en-US", 
          { day: 'numeric',
            month: 'short',
          }
        );

        //? Returns day from a given date
        function getDayOfWeek(date) {
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        }

        historicalItem.innerHTML = `
        <p class="historical-day">${getDayOfWeek(historicalDate)}, ${historicalDateTime}</p>
        <p class="historical-temp" style="display: flex;justify-content:center;">
          <img
          src="http://openweathermap.org/img/wn/${dayData.icon}.png"
          alt=""
          class="icon"
          width="28px"
          height="28px"
          />
          
          ${Math.round(dayData.temperature)}°C
        </p>
        <p class="historical-humidity">${dayData.humidity}%</p>
        <p class="historical-pressure">${dayData.pressure}Pa</p>
        <p class="historical-windspeed">${dayData.wind_speed}km/h</p>
        `;

        historicalWeatherDiv.appendChild(historicalItem);
      });
    } else {
      //? Hide the historical-weather div for cities other than Nagaon
      historicalWeatherDiv.style.display = 'none';
    }
  },

  //? Search function
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  //? 404 Not Found // Error
  notFound: function(err) {
    //? Hiding weather information and displaying not found message
    historicalWeatherDiv.style.display = 'none';
    document.querySelector('.weather').style.display = 'none';
    document.querySelector('.not-found').style.display = 'block';
    document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1650692201357-3b1b15469952?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  },
};

//? Search when btn is clicked
document.querySelector(".search button").addEventListener("click", () => {
  if (searchBar.value != '') {
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
