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

searchBtn.on("click")