let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let feels = document.getElementById('feels');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');
let description = document.getElementById('description');
let map; // Global variable for the map

let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

// Request notification permission if not already granted
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Update the map with the given coordinates
const updateMap = (lat, lon) => {
    if (!map) {
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 10);
    }
    L.marker([lat, lon]).addTo(map).bindPopup('Location of ' + valueSearch.value).openPopup();
};

// Update UI dynamically
const updateUI = (data) => {
    city.querySelector('figcaption').innerText = data.name;
    city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperature.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    temperature.querySelector('figcaption').innerHTML = `${Math.round(data.main.temp)}<sup>o</sup>`;
    description.innerText = data.weather[0].description;
    clouds.innerText = data.clouds.all;
    humidity.innerText = data.main.humidity;
    pressure.innerText = data.main.pressure;
    feels.innerHTML = `${Math.round(data.main.feels_like)}<sup>o</sup>`;
};

// Fetch weather by city name
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value !== '') {
        fetch(url + '&q=' + valueSearch.value)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    updateUI(data);
                    updateMap(data.coord.lat, data.coord.lon);
                    checkWeatherAlerts(data);
                } else {
                    alert('City not found. Please try again.');
                    if (navigator.vibrate) {
                        navigator.vibrate(500); // Vibrate for 500ms
                    }
                }
                valueSearch.value = '';
            })
            .catch(err => console.error("Error fetching weather:", err));
    }
});


// Fetch weather by geolocation
const fetchWeatherByLocation = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`${url}&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateUI(data);
                updateMap(lat, lon);
                checkWeatherAlerts(data);
            } else {
                alert("Unable to fetch weather for your location.");
            }
        })
        .catch(err => console.error("Error fetching geolocation weather:", err));
};

// Handle geolocation errors
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, () => {
            alert("Geolocation access denied. Defaulting to manual search.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Function to check weather conditions and trigger notifications
const checkWeatherAlerts = (data) => {
    const { main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description.toLowerCase();

    // Example alert conditions
    if (temperature > 40) {
        triggerNotification("Extreme Heat Alert", `The temperature in ${data.name} is ${temperature}°C, stay cool and hydrated!`);
    } else if (description.includes('storm') || description.includes('rain')) {
        triggerNotification("Storm Alert", `A storm is expected in ${data.name}, please take precautions!`);
    } else if (main.humidity > 80) {
        triggerNotification("High Humidity Alert", `Humidity in ${data.name} is quite high: ${main.humidity}%, stay comfortable!`);
    } else if (main.feels_like > 35) {
        triggerNotification("Feels Like Alert", `The temperature feels like ${main.feels_like}°C in ${data.name}, it’s quite hot!`);
    } else if (temperature < 0) {
        triggerNotification("Extreme Cold Alert", `The temperature in ${data.name} is ${temperature}°C, stay indoors and stay warm!`);
    }
    if(temperature<0){
        triggerNotification("Extreme cold Alert", `The temperature in ${data.name} is ${temperature}°C, stay at warm place`);
    }
};

// Function to trigger notifications
const triggerNotification = (title, body) => {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: "https://openweathermap.org/img/wn/01d.png"
        });
    }
};

// Real-time clock update
const updateDateTime = () => {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    dateTimeElement.innerText = now.toLocaleDateString(undefined, options);
};
document.getElementById('useLocationBtn').addEventListener('click', () => {
    // Redirect to rain.html when the button is clicked
    window.location.href = 'rain.html';
});


// Set the clock to update every second
setInterval(updateDateTime, 1000);
updateDateTime();
