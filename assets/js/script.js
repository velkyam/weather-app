// https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=30857e4f13cff72193a8a92473d8bcba

var APIKey = "30857e4f13cff72193a8a92473d8bcba";
var units = "imperial"
var searchBtn = document.querySelector("#search")
var container = document.querySelector("#container")
var main = document.querySelector("main")
var cityInput = document.querySelector("#cityInput")
var today = moment().format("L")
var tomorrow = moment().add(1, 'days').format("L")
var twodays = moment().add(2, 'days').format("L")
var threedays = moment().add(3, 'days').format("L")
var fourdays = moment().add(4, 'days').format("L")
var fivedays = moment().add(5, 'days').format("L")
var dashBoard = document.querySelector("#dashBoard")
var forecast = document.querySelector("#forecast")
// var forecastcheck=document.querySelector("forecast").innerHTML

var week = [today,tomorrow,twodays,threedays,fourdays,fivedays]

var index=localStorage.getItem("index");
if (index===null){
    index=0;
}
    
    function renderTable(){

        for (let i = 0; i < index; i++) {
            var cityTab = document.querySelector("#city"+[i])
                cityTab.textContent = localStorage.getItem("city"+[i])
                cityTab.setAttribute("class","list-group-item list-item")
                container.appendChild(cityTab)
            }
        }

        searchBtn.addEventListener('click',function(event){
            


        var city = document.querySelector("#cityInput").value
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey+"&units="+units;
    
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
  
            localStorage.setItem("city"+[index],data.city.name)
            index++;
            localStorage.setItem("index",index)

    
            //today dashboard
            var mainheading = document.querySelector("#heading")
            var maintemp = document.querySelector("#temp")
            var mainwind = document.querySelector("#wind")
            var mainhum = document.querySelector("#hum")
            mainheading.textContent = data.city.name +" (" + today + ")"
            maintemp.textContent = "Temp: " + data.list[0].main.temp + " °F"
            mainwind.textContent = "Wind: " + data.list[0].wind.speed + " MPH"
            mainhum.textContent = "Humidity: " + data.list[0].main.humidity + "%"
            //forecast title
            var forecastTit=document.querySelector("#forecastTit")
            forecastTit.textContent="5-Day Forecast:"

            //forecast cards
            for (let i = 1; i < 6; i++) {
                
                var card = document.createElement("div")
                card.setAttribute("class","card")
                            var heading = document.createElement("h1")
                            var temp = document.createElement("p")
                            var wind = document.createElement("p")
                            var hum = document.createElement("p")
                            heading.textContent = week[i]
                            temp.textContent = "Temp: " + data.list[i].main.temp + " °F"
                            wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH"
                            hum.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                            forecast.appendChild(card)
                            card.appendChild(heading)
                            heading.appendChild(temp)
                            temp.appendChild(wind)
                            wind.appendChild(hum)
            }
        
        renderTable();
      
        
        })
        
        cityInput.value = "";
    })
    
    renderTable();



    


