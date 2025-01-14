# Weather Website Project

This repository contains a weather website that provides real-time weather data and an interactive map using the OpenWeatherMap API and Leaflet.js.

## Features
- Fetch real-time weather data by city name or user's geolocation.
- Display key weather metrics such as:
  - Temperature
  - Humidity
  - Pressure
  - Cloud Coverage
  - Weather Description
  - Feels Like Temperature
- Interactive map displaying the location with a marker.
- Notifications for specific weather alerts (e.g., extreme heat, storms, high humidity).
- Real-time clock display.
- Geolocation support for fetching weather based on the user's current location.

## Technologies Used
- HTML5, CSS3, JavaScript (Frontend)
- [OpenWeatherMap API](https://openweathermap.org/) (Weather Data)
- [Leaflet.js](https://leafletjs.com/) (Interactive Map)
- [FlagsAPI](https://flagsapi.com/) (Country Flags)

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, etc.)
- Internet connection
- OpenWeatherMap API Key

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-website
   ```
3. Open `index.html` in your preferred web browser.

### Configuration
Replace the `id` variable in the JavaScript file with your OpenWeatherMap API key:
```javascript
let id = 'your-api-key';
```

## Usage
- Enter a city name in the search bar and press Enter to fetch weather data.
- Use the "Use My Location" button to fetch weather based on your current location.
- View real-time weather alerts and an interactive map for the selected location.

## File Structure
```
weather-website/
├── index.html       # Main HTML file
├── style.css        # Stylesheet
├── script.js        # JavaScript logic
├── README.md        # Project README
└── assets/          # Images and other assets
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- OpenWeatherMap for providing weather data.
- Leaflet.js for the interactive map.
- FlagsAPI for country flags.

---

Feel free to enhance this project and share your feedback!
