# Weather Visualization Web Application

A responsive web application that displays current weather conditions with animated visual themes based on the weather type.

## Features

- 🌦 **Real-time weather data** from OpenWeatherMap API
- 🎨 **Dynamic visual themes** that change based on weather conditions:
  - ☀️ Sunny (clear skies)
  - ☁️ Cloudy 
  - 🌧️ Rainy (with animated rain)
  - ❄️ Snowy (with falling snow)
  - ⛈️ Stormy (with lightning effects)
  - 🌫️ Foggy (with mist animations)
- 📱 **Fully responsive** design that works on mobile and desktop
- 💾 **Local storage** to remember your last searched city
- ✨ **Smooth animations** and transitions throughout the UI

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with animations and transitions)
  - JavaScript (ES6)
  
- **API**:
  - OpenWeatherMap API

- **Tools**:
  - Git for version control
  - GitHub for hosting

## Installation & Usage

1. **Requirements**:
   - Modern web browser (Chrome, Firefox, Safari, Edge)
   - Internet connection (for API access)

2. **Setup**:
   ```bash
   git clone https://github.com/leksik-phew/weather_visualization_web.git
   cd weather-visualization
   ```
3. **Running the app**:
   - Simply open index.html in your preferred browser
   - No server required - works as a standalone web app

4. **Using the app**:
   - Type a city name in the input field
   - Press "Show Weather" or hit Enter
   - Use "Change City" button to search again

## How It Works
### Technical flow

1. **User Input**:
   - City name is captured from the input field
   - Input is sanitized to prevent XSS attacks

2. **API Request**:
   - Application makes GET request to OpenWeatherMap API
  ```javascript
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  ```

3. **Response Handling**:
   - Parses JSON response for:   
     - Weather condition (Clear, Rain, Snow etc.)
     - Temperature data
     - Humidity

   - Handles errors (invalid city, network issues)

4. **UI Update**:
   - Dynamically loads appropriate CSS theme
   - Applies weather-specific animations
   - Updates DOM with weather information

5. **Customization**:
  - Easy Modifications:
   - Themes:
    - Edit any [weather-type].css file to change:
