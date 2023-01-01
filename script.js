document.body.style.backgroundImage =
  "linear-gradient(to right,#80FF72,#7EE8FA)";

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
        long: Element.latlng[1],
        apiID: "1acb6827be427b8f24e88a8b1aa0fa3b",
      };
      Countries(CountryObj);
    });
  });

function Countries({ flag, capital, name, region, CCode, lat, long, apiID }) {
  document.body.innerHTML += `
  <div class="align"><div class="card" style="width: 15rem;">
  <div class="card-header">
  <h5 class="card-title">Country Flag</h5>
</div>
<img class="card-img-top" src="${flag}" alt="${name}">
<div class="card-body">
  <h5 class="card-title">${name}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item"> <span>Capital :</span> ${capital}</li>
  <li class="list-group-item"> <span>Region :</span> ${region}</li>
  <li class="list-group-item"> <span>Code :</span> ${CCode}</li>
</ul>
<div class="card-body text-center">
<button onclick = "weatherModal(lat, long, apiID)" class="btn btn-primary" id="mpopupLink">Click for Weather</button>
</div>
</div>
</div>`;


return lat,long,apiID;
  // Select trigger link
  // var mpLink = document.getElementById("mpopupLink");

  // mpLink.onclick = weatherModal(lat, long, apiID);
}

function weatherModal(latitude, longitude, api) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherType = data.weather[0].main;
      weatherDesc = data.weather[0].description;
      weatherIcon = data.weather[0].icon;
      weatherTemp = data.main.temp;
      weatherTemp = weatherTemp - 273.15;
      weatherTemp = weatherTemp.toFixed(2);
      weatherPlace = data.name;
      document.getElementById("mpopupLink").innerHTML = `${weatherTemp}&#8451, ${weatherDesc}`;
      // document.getElementById("type").innerHTML = weatherType;
      // document.getElementById(
      //   "image"
      // ).src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      // document.getElementById("temp").innerHTML = `${weatherTemp}&#8451;`;
      // document.getElementById("place").innerHTML = weatherPlace;
      // document.getElementById("desc").innerHTML = weatherDesc;
      // weatherModal(weatherType,weatherDesc,weatherIcon,weatherTemp,weatherPlace);
    })
    .catch((err) => console.error(err));
}

// function weatherModal(main,desc,icon,temp,name) {
//   mpopup.style.display = "block";
//   document.getElementById("type").innerHTML = main
//   document.getElementById("image").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//   document.getElementById("temp").innerHTML = `${temp}&#8451;`;
//   document.getElementById("place").innerHTML = name;
//   document.getElementById("desc").innerHTML = desc;
// };

// var mpopup = document.getElementById("mpopupBox");

// var close = document.getElementsByClassName("close")[0];

// // Close modal once close element is clicked
// close.onclick = function () {
//   mpopup.style.display = "none";
// };

// // Close modal when user clicks outside of the modal box
// window.onclick = function (event) {
//   if (event.target == mpopup) {
//     mpopup.style.display = "none";
//   }
// };

/* <a class="btn btn-primary" href="https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiID}" role="button">Weather</a> */

// id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d'

// apikey(rocket) - "ec9cf35d0234d760be56157921c89c6a"

// celcius &#8451;
