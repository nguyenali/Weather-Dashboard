let searchInput = $ (".searchInput");
let searchBtn = $(".searchBtn");
let apiKey = "3a"


let searchHistoryEl =$(".historyItems");
let weatherIconEl = $(".weatherIcon");
let currentDateEl = $(".currentDate");
let cityNameEl = $(".cityName");


let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".windspeed");
let cardRow = $(".card-row");
let tempEl = $(".temp");
let humidityEl = $(".humidity");


var today = new Date ();
var today = mm + '/' + dd + '/' + yyyy;
let dd = String(today.getDate()).padstart(2,'0');
let mm = String(today.getMonth() + 1).padstart(2.'0');
let yyyy = today.getFullYear();


if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
} 
else{
    console.log("seatchHistory loaded into searchHistoryArr");
    renderSearchHisory();
}

searchBtn.on("click", function(e) {
    e.preventDefault();
    if (searchInput.val() === "") {
        alert("You must enter a city");
        return;
    }
    console.log('clicked button')
    getWeather(searchInput.val());
});

//add in history visit


function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text('(${today})')
    tempEl.text('Temperature: ${cityTemp}'); //add in degree f
    humidityEl.text('Humidity; ${cityHumidity}%');
    windSpeedEl.text('Wind Speed: ${cityWindSpeed} MPH');
    uvIndexEl.text('UV Index: $ {uvVal}');
    weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desiredCity) {
    let queryURL =//add in link here;
    $.ajax({
        url:queryURL,
        method: "GET"
    })
    .then(function(weatherData){
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.main.wind.speed,
            cityUVIndex: weatherData.coord,
            cityWeatherIconName: weatherData.weather[0].icon
        }

        let queryURL = //add in link
        $.ajax({
        url:queryURL,
        method: "GET"
        })
    })
}