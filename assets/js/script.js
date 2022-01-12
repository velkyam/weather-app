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
var listCities = document.querySelector("#listCities")


var week = [today,tomorrow,twodays,threedays,fourdays,fivedays]

var index=localStorage.getItem("index");
if (index===null){
    index=0;
}



function dash(){
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
        dashBoard.setAttribute('class', 'dashboard')
        var mainheading = document.createElement("h3")
        var maintemp = document.createElement("p")
        var mainwind = document.createElement("p")
        var mainhum = document.createElement("p")
        mainheading.textContent = data.city.name +" (" + today + ")"
        maintemp.textContent = "Temp: " + data.list[0].main.temp + " °F"
        mainwind.textContent = "Wind: " + data.list[0].wind.speed + " MPH"
        mainhum.textContent = "Humidity: " + data.list[0].main.humidity + "%"
        dashBoard.appendChild(mainheading)
        dashBoard.appendChild(maintemp)
        dashBoard.appendChild(mainwind)
        dashBoard.appendChild(mainhum)
        var icon = document.createElement("img")
        icon.src = 'http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon +'@2x.png'
        mainheading.appendChild(icon)
        

        

        //forecast title
        var forecastTit=document.querySelector("#forecastTit")
        forecastTit.textContent="5-Day Forecast:"

        //forecast cards
        for (let i = 1; i < 6; i++) {
                        
            var card = document.createElement("div")
            card.setAttribute("class","card")
                        var heading = document.createElement("p")
                        heading.setAttribute("style","font-weight: bold; font-size: 20px")
                        var icon2 = document.createElement("img")
                        icon2.src = 'http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon +'.png'
                        var temp = document.createElement("p")
                        var wind = document.createElement("p")
                        var hum = document.createElement("p")
                        heading.textContent = week[i]
                        temp.textContent = "Temp: " + data.list[i].main.temp + " °F"
                        wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH"
                        hum.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                        forecast.appendChild(card)
                        card.appendChild(heading)
                        heading.appendChild(icon2)
                        card.appendChild(temp)
                        card.appendChild(wind)
                        card.appendChild(hum)
        }
    
    renderTable();
  
        
    })
            

            dashBoard.innerHTML = ''
            forecast.innerHTML = ''
            listCities.innerHTML=''
            
        cityInput.value = "";
    }
    
function renderTable(){

        for (let i = 0; i < index; i++) {
            var cityTab = document.createElement("button")
                cityTab.setAttribute("id","#city"+[i])
                cityTab.textContent = localStorage.getItem("city"+[i])
                cityTab.setAttribute("class","list-group-item list-item")
                listCities.appendChild(cityTab)
                cityTab.addEventListener('click', function(event){
                    console.log(localStorage.getItem("city"+[i]))
                   
                        var city = localStorage.getItem("city"+[i])
                        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey+"&units="+units;
                   
                    fetch(requestUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                    //today dashboard
                    dashBoard.setAttribute('class', 'dashboard')
                    var mainheading = document.createElement("h2")
                    var maintemp = document.createElement("p")
                    var mainwind = document.createElement("p")
                    var mainhum = document.createElement("p")
                    mainheading.textContent = data.city.name +" (" + today + ")"
                    maintemp.textContent = "Temp: " + data.list[0].main.temp + " °F"
                    mainwind.textContent = "Wind: " + data.list[0].wind.speed + " MPH"
                    mainhum.textContent = "Humidity: " + data.list[0].main.humidity + "%"
                    dashBoard.appendChild(mainheading)
                    dashBoard.appendChild(maintemp)
                    dashBoard.appendChild(mainwind)
                    dashBoard.appendChild(mainhum)
                    var icon = document.createElement("img")
                    icon.src = 'http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon +'@2x.png'
                    mainheading.appendChild(icon)
            
                    //forecast title
                    var forecastTit=document.querySelector("#forecastTit")
                    forecastTit.textContent="5-Day Forecast:"
            
                    //forecast cards
                    for (let i = 1; i < 6; i++) {
                        
                        var card = document.createElement("div")
                        card.setAttribute("class","card")
                                    var heading = document.createElement("p")
                                    heading.setAttribute("style","font-weight: bold; font-size: 20px")
                                    var icon2 = document.createElement("img")
                                    icon2.src = 'http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon +'.png'
                                    var temp = document.createElement("p")
                                    var wind = document.createElement("p")
                                    var hum = document.createElement("p")
                                    heading.textContent = week[i]
                                    temp.textContent = "Temp: " + data.list[i].main.temp + " °F"
                                    wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH"
                                    hum.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                                    forecast.appendChild(card)
                                    card.appendChild(heading)
                                    heading.appendChild(icon2)
                                    card.appendChild(temp)
                                    card.appendChild(wind)
                                    card.appendChild(hum)
                    }
                
                renderTable();

                })
                        
            
                        dashBoard.innerHTML = ''
                        forecast.innerHTML = ''
                        listCities.innerHTML=''
                        
                    cityInput.value = "";
                
                })
            }
       
        }

searchBtn.addEventListener('click',function(event){
    if (cityInput.value=== ""||cityInput.value === null){
        alert("Must enter a city!")
    } else{
    dash()}
     })        

    
renderTable();



    


