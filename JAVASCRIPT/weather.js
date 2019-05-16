const weather = document.querySelector(".js-weather");

const API_KEY="39f7dd8047b7f32c9df45a14dd419e2c";
const COORD = "coord";

function saveCoord(coordObj){
    localStorage.setItem(COORD,JSON.stringify(coordObj));
}

function getWeather(lat,lng){
    fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const city = json.name;
        weather.innerText = `온도:${temp},위치:${city}`;
    });
}

function handleSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj={
        latitude,
        longitude
    };
    saveCoord(coordObj);
    getWeather(latitude,longitude);
}

function handleError(){
    console.log("can't access location");
}

function askForCoord(){
    navigator.geolocation.getCurrentPosition(handleSuccess,handleError);
}

function loadCoord(){
    const loadedCoord = localStorage.getItem(COORD);
    if (loadedCoord ===null){
        askForCoord();
    }else{
        const parsedCoord = JSON.parse(loadedCoord);
        getWeather(parsedCoord.latitude,parsedCoord.longitude);
    }
}

function init(){
    loadCoord();
}
init();