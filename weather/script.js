// Initialize the map and set the view
const map = L.map('map').setView([20, 77], 6); // Zoom level adjusted to 6

// Add OpenStreetMap base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Add OpenWeatherMap rainfall tile layer
const apiKey = '2a12c4029139b6a08dfe4975e6542ae3'; // Your API key
L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Weather data © OpenWeatherMap',
    opacity: 0.6,
}).addTo(map);

// Add RainViewer fallback layer (optional)
L.tileLayer('https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/1/1_1.png', {
    attribution: 'Weather data © RainViewer',
    opacity: 0.6,
}).addTo(map);

// Add scale control
L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

// Add a marker and popup
const marker = L.marker([20, 77]).addTo(map);
marker.bindPopup('<b>Rainfall Map</b><br>This map shows real-time rainfall data.').openPopup();
