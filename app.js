const APIKEY = '9b8025b0d51454a916a53951eebc55b7';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url){
    return fetch(url).then(result => result.json())
}

function updateDOM(temp, name){
    const temperatura = document.getElementById('temperatura');
    const city = document.getElementById('ciudad');
    const tempC = (temp - 273.15).toFixed(2);
    
    temperatura.textContent = `${ tempC }`;
    city.textContent = `${ name }`;

    const fondo = changeBackgroundColor(tempC);
    document.body.style.backgroundColor = fondo;
}

function changeBackgroundColor(temperatura){
    if(temperatura < 10){
        return '#00BFFF';
    } else {
        return '#FF4500';
    }
}

async function getClima(lat, lon){
    const url = URLBASE + `lat=${ lat }&lon=${ lon }&appid=${ APIKEY }`;
    const data = await request(url);
    console.log("Temperatura: ", data.main.temp);
    console.log("Ciudad: ", data.name);
    updateDOM(data.main.temp, data.name);
}

navigator.geolocation.getCurrentPosition(positions => {
    const lat = positions.coords.latitude;
    const lon = positions.coords.longitude;
    getClima(lat, lon);
})