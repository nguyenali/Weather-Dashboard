let apiKey = "3ac0d8db34de82819d13a9167239acc1";
let searchInput = $ (".searchInput");
let searchBtn = $(".searchBtn");


let searchHistoryEl =$(".historyItems");
let weatherIconEl = $(".weatherIcon");
let currentDateEl = $(".currentDate");
let cityNameEl = $(".cityName");


let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");
let cardRow = $(".card-row");
let tempEl = $(".temp");
let humidityEl = $(".humidity");


var today = new Date ();
var today = mm + '/' + dd + '/' + yyyy;
let dd = String(today.getDate()).padstart(2,'0');
let mm = String(today.getMonth() + 1).padstart(2, '0');
let yyyy = today.getFullYear();


if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
} 
else{
    console.log("searchHistory loaded into searchHistoryArr");
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

$(document).on("click", ".historyEntry", function(){
    console.log("clicked history item")
    let thisElement = $(this);
    getWeather(thisElement.text());
})

function renderSearchHisory(cityName) {
    searchHistoryEl.empty();
    let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i=0; i < searchHistoryArr.length; i++) {
        let newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
}


function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(`Temperature: ${cityTemp} °F`); 
    humidityEl.text(`Humidity; ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text(`UV Index: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desiredCity) {
    let queryURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial';
    $.ajax({
        url: queryURL,
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

        let queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
        $.ajax({
        url:queryURL,
        method: "GET"
        })
        .then(function(uvData) {
            if(JSON.parse(localStorage.getItem("searchHistory")) == null) {
                let searchHistoryArr = [];

            if(searchHistoryArr.indexOf(cityObj,cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);

                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
                renderSearchHisory(cityObj.cityName);
            }else{
                console.log("city already in searchHistory. Not adding to history list")
                let renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
            
            }
            } else {
                let searchHistoryArr =JSON.parse(localStorage.getItem("searchHistory"));

                if(searchHistoryArr.indexOf(cityObj,cityName) === -1) {
                    searchHistoryArr.push(cityObj.cityName);

                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);
                renderSearchHisory(cityObj.cityName);
            } 
            else{
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }

        }
    })


});


    getFiveDayForecast();

    function getFiveDayForecast() {
        cardRow.empty ();
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url:queryURL,
            method: "Get"
        })
        .then(function(fiveDayResponse){
            for (let i=0; i != fiveDayResponse.list.length; i+=8) {
                let cityObj ={
                    date: fiveDayResponse.list[i].dt_txt,
                    icon: fiveDayResponse.list[i].weather[0].icon,
                    temp: fiveDayResponse.list[i].main.temp,
                    humidity: fiveDayResponse.list[i],main.humidity
                }
                let dateStr=cityObj.date;
                let trimmedDate =dateStr.substring(0,10);
                let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                createForecastCard(trimmedDate,weatherIco,cityObj.temp,cityObj.humidity);
            }
        })
    }
}



function createForecastCard(date, icon, temp, humidity) {

    let fiveCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate =$("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity =$("<p>").attr("class", "card-text");

    cardRow.append(fiveCDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`); 
    fiveCardEl.append(cardDate, cardIcon. cardTemp, cardHumidity);

}