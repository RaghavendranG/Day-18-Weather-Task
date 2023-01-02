document.body.style.backgroundImage =
  "linear-gradient(to right,#80FF72,#7EE8FA)";
var container = document.createElement("div");
container.setAttribute("class", "container px-4");

var row = document.createElement("div");
row.setAttribute("class", "row justify-content-between g-4");
container.append(row);

const apiID = "1acb6827be427b8f24e88a8b1aa0fa3b";

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((Element) => {
      const CountryObj = {
        ...Element,
        flag: Element.flags.png,
        capital: Element.capital,
        name: Element.name.common,
        region: Element.region,
        CCode: Element.cca2,
        lat: Element.latlng[0],
        long: Element.latlng[1]
      };
      Countries(CountryObj);
    });
  });

function Countries({ flag, capital, name, region, CCode, lat, long }) {
  row.innerHTML += `
  <div class="col col-lg-4 col-md-3 col-sm-12">
  <div class="card">
  <div class="card-header">
  <h4 class="card-title">${name}</h4>
</div>
<img class="card-img-top" src="${flag}" alt="${name}">
<div class="card-body">
  <h5 class="card-title">Country Flag</h5>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item"> <span>Capital :</span> ${capital}</li>
  <li class="list-group-item"> <span>Region :</span> ${region}</li>
  <li class="list-group-item"> <span>Code :</span> ${CCode}</li>
</ul>
<div class="card-body text-center">
<button class="btn btn-primary" id="mpopupLink" onclick="weatherData('${lat}','${long}','${apiID}')">Click for Weather</button>
</div>
</div>
</div>
` ;

document.body.append(container);
}

function weatherData(latitude, longitude, apikey) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherInfo = data.weather[0].main;
      weatherDescription = data.weather[0].description;
      weatherIcon = data.weather[0].icon;
      weatherTemperature = data.main.temp;
      //converting kelvin to celsius
      weatherTemperature = weatherTemperature - 273.15;
      weatherTemperature = `${weatherTemperature.toFixed(2)}&#8451`;
      weatherPlace = data.name;
      displayWeather(weatherInfo, weatherDescription, weatherTemperature, weatherIcon,weatherPlace);
    })
    .catch((error) => console.error(error));
} 

function displayWeather(main,desc,temp,icon,place){
  var mpopup = document.getElementById('mpopupBox');
  mpopup.style.display = "block";
  document.getElementById("type").innerHTML = `<span>Weather type :</span> ${main}, ${desc}`;
  document.getElementById("image").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("place").innerHTML = place;
  document.getElementById("temp").innerHTML = temp;
  
  var close = document.getElementsByClassName("close")[0];
 
  close.onclick = function() {
      mpopup.style.display = "none";
  };
  
  window.onclick = function(event) {
      if (event.target == mpopup) {
          mpopup.style.display = "none";
      }
  };
}
