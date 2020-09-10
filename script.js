var apiKey = "9cbfe8cd823e8937562a4261a0fd0606";
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var weatherInfoEl = document.querySelector("#weather-info");
var cardDeckEl = document.querySelector("#card-deck");

var currentData = {};
var forecastData = {};
var historyItems = [];

var listI = 0;






// var searchInputEl = document.querySelector('.search-input');
// var inputLocation = 'bodega bay';
// var searchBtnEl = document.querySelector('.searchBtn');
// var aqiaqiKey = "1vc52pkt9n68c5fnv6mgkom1ah";



// var getAqi = function(input) {
//     //URl request
//     var aqiApi= "http://api.airpollutionapi.com/1.0/aqi?lat="+ lat + "&lon=" + lon + "&APPID=" + apiKey;

//     //make URL request  
//     fetch(aqiApi).then(function(response){
//         response.json().then(function(data){
//             console.log(data);
//             displayaqiResults(data);
//         });
    
//     });

// };

// var displayaqiResults = function(info) {
//     var data = info.data.value;
//         console.log(data);

// };


// var formsubmitHandler = function(event){
//      event.preventDefault();
//      var searchLocation =searchInputEl.value.trim();
//      console.log(searchLocation);

//      if(searchLocation){
//          getAqi(searchLocation)
//          searchInputEl.value = " ";
//      } else{
//          alert("Please enter search campgrounds location!");
//      }

// };


// fetch current weather info
var getCurrentWeather = function(cityName) {

    var currentUrl = "https://api.openweathermap.org/data/2.5/find?q=" + cityName + ",us&units=imperial&APPID=" + apiKey;

    fetch(currentUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayCurrentWeather(data)
                addSearchItem(data.list[0].name);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
};

// displays called current weather information 
var displayCurrentWeather = function(weather, city) {
    
    if (weather.length === 0) {
        alert("No city found! Try again.");
        return;
    }

    removeAllChildNodes(currentWeatherEl);
    // TODO: reset elements
    var cityTitleEl = document.createElement("h4");
    var dateUnix = weather.list[0].dt;
    var dateText = "(" + moment.unix(dateUnix).format('MM/DD/YYYY') + ")";
    var weatherMain = weather.list[0];
    cityTitleEl.textContent = weatherMain.name + " " + dateText;
    currentWeatherEl.appendChild(cityTitleEl);

    addWeatherIcon(weatherMain, cityTitleEl);
    addTempText(weatherMain, currentWeatherEl);
    addHumidText(weatherMain, currentWeatherEl);

    var currentWind = document.createElement("span")
    currentWind.textContent = "Wind Speed: " + weatherMain.wind.speed + " MPH"  ;
    currentWeatherEl.appendChild(currentWind);

    // coordinates for uv index
    const lat = weatherMain.coord.lat;
    const lon = weatherMain.coord.lon;

    fetchAndDisplayUv(lat, lon);   
};

// grabs and displays UV index
var fetchAndDisplayUv = function(lat, lon) {

    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;

    fetch(uvUrl)
        .then(function(response){
            response.json().then(function(data){
                var currentUv = document.createElement("span");
                // color code uv index value
                if (data.value <= 2) {
                    currentUv.setAttribute("class", "bg-success");
                } else if (data.value <= 5 ) {
                    currentUv.setAttribute("class", "bg-warning");
                } else if (data.value <= 7 ) {
                    currentUv.setAttribute("class", "bg-orange");
                } else {
                    currentUv.setAttribute("class", "bg-danger");
                }
                currentUv.textContent = "UV Index: " + data.value;
            
                currentWeatherEl.appendChild(currentUv);
            });
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

// calls and saves weather data
var getForecast = function(cityName) {

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&units=imperial&APPID=" + apiKey;

    fetch(forecastUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayForecast(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
};

// displays called weather information
var displayForecast = function(weather) {
    
    if (weather.length === 0) {
        alert("No city found! Try again.");
        return;
    }
    
    
    for (weatherIndex = 1;weatherIndex < 6 ; weatherIndex++) {
        // grabs one weather info daily
        var weatherMain = weather.list[(weatherIndex*8)-1];
        var currentDayId = "day" + weatherIndex;
        var currentDayEl = document.querySelector("#" + currentDayId);
        removeAllChildNodes(currentDayEl);
        
        // displays date text
        var dateUnix = weatherMain.dt;
        var dateText = "(" + moment.unix(dateUnix).format('MM/DD/YYYY') + ")";
        var dateEl = document.createElement("h5");
        dateEl.textContent = dateText;
        currentDayEl.appendChild(dateEl);

        // display icon, temp and humidity
        addWeatherIcon(weatherMain, currentDayEl);
        addTempText(weatherMain, currentDayEl);
        addHumidText(weatherMain, currentDayEl);
    }
};

var addWeatherIcon = function(weatherMain, ele) {

    var imgEl = document.createElement("img");
    var iconId = weatherMain.weather[0].icon;

    imgEl.setAttribute("src", getIconImgUrl(iconId));
    imgEl.setAttribute("width", "50px");
    imgEl.setAttribute("height", "50px");
    ele.appendChild(imgEl);
};

var addTempText = function(weatherMain, ele) {
    var temp = document.createElement("span")
    temp.textContent = "Temp: " + Math.round(weatherMain.main.temp) + " °F" ;

    ele.appendChild(temp);
};

var addHumidText = function(weatherMain, ele) {
    var humid = document.createElement("span")
    humid.textContent = "Humidity: " + weatherMain.main.humidity + " %" ;

    ele.appendChild(humid);
};

// grabs icon per given weather condition
var getIconImgUrl = function(iconId) {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
};

// adds to search history list
var addSearchItem = function(city) {
    // adds last searched city to history
    var searchItemEl = document.createElement("li");
    searchItemEl.classList = "list-group-item";
    // allows for history items to be selected as search queries 
    var historyButtonEl = document.createElement("button");
    historyButtonEl.setAttribute("type","submit");
    historyButtonEl.classList = "btn btn-white";
    historyButtonEl.textContent = city;

    searchItemEl.appendChild(historyButtonEl);
    searchHistoryEl.prepend(searchItemEl);
    
    localStorage.setItem(listI, city);
    listI++;
};


// resets elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getCurrentWeather(cityName);
        cityNameInputEl.value = "";
        getForecast(cityName);
    } else {
        alert("Please enter the name of a city!");
    }
};

// handles search items when selected
var historySelectHandler = function(event) {

    var cityName = event.target.textContent;
    console.log(cityName);

    if (cityName) {
        getCurrentWeather(cityName);
        cityNameInputEl.value = "";
        getForecast(cityName);
    } else {
        alert("Please enter the name of a city!");
    }
};

var renderSearchList = function() {

    if (localStorage.length === 0) {
        return;
    } else {
        for(var i=0; i < localStorage.length; i++) {
            var city = localStorage.getItem(i);
            $("#search-history").append(`<li class="list-group-item"><button class="btn btn-white" type="submit">${city}</button></li>`);
        }
    }
    listI = i;
    
};


renderSearchList();
userFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", historySelectHandler);