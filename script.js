let searchInput = $ (".searchInput");
let searchBtn = $(".searchBtn");
let apiKey = "3ac0d8db34de82819d13a9167239acc1"


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
        .then(function(uvData) {
            if(JSON.parse(localStorage.getItem(searchHistory")) == null) {
                let searchHistoryArr = [];

            if(searchHistoryArr.indexOf(cityObj,cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);

                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderWeatherIcon = //add in link 
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
                renderSearchHisory(cityObj.cityName);
            }
            else{
                console.log("city already in searchHistory. Not adding to hisotry list")
                let renderWeatherIcon ='add in link';
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
            }
            } else {
                let searchHistoryArr =JSON.parse(localStorage.getItem("searchHistory"));

                if(searchHistoryArr.indexOf(cityObj,cityName) === -1) {
                    searchHistoryArr.push(cityObj.cityName);

                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderWeatherIcon = //add in link 
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
                renderSearchHisory(cityObj.cityName);
            }

        })
    })
}


function createForecastCard( date, icon, temp, humidity) {

    let fiveCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate =$("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity =$("<p>").attr("class", "card-text");

    cardRow.append(fiveCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text('Temp: ${temp}'); //add in degree f
    fiveCardEl.append(cardDate, cardIcon. cardTemp, cardHumidity);

}