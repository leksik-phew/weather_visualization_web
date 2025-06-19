const apiKey = '0994cb9a7f5f97d6002c4ed0aba6afa6';
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather-button');
const weatherDisplay = document.getElementById('weather-display');
const themeLink = document.getElementById('theme-link');
const changeCityButton = document.getElementById('change-city-button');
const moodText = document.getElementById('mood-text');

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function getWeatherMood(weatherMain, temp) {
    const moods = {
        'Clear': {
            warm: 'Perfect day for outdoor activities! ☀️',
            cold: 'Beautiful but chilly day! ❄️'
        },
        'Clouds': 'A bit gloomy, but cozy! ☁️',
        'Rain': 'Perfect day to stay inside with a book! 📚☕',
        'Drizzle': 'Light rain - don\'t forget your umbrella! ☔',
        'Snow': 'Winter wonderland! Build a snowman! ⛄',
        'Thunderstorm': 'Stay safe indoors! ⚡',
        'Mist': 'Mysterious foggy atmosphere... 🌫️',
        'Fog': 'Drive carefully in this fog! 🚗',
        'Haze': 'Slightly hazy conditions today 🌫️'
    };

    if (weatherMain === 'Clear') {
        return temp > 20 ? moods.Clear.warm : moods.Clear.cold;
    }
    return moods[weatherMain] || 'Enjoy your day!';
}

async function fetchWeather(city) {
    city = sanitizeInput(city.trim());
    if (!city) return;

    try {
        weatherDisplay.innerHTML = '<p>Loading weather data...</p>';
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`
        );

        console.log(response);
        

        if (!response.ok) {
            throw new Error(response.status === 404 ? 'City not found' : 'Weather data unavailable');
        }

        const data = await response.json();
        localStorage.setItem('lastCity', city);
        
        const weatherMain = data.weather[0].main;
        const description = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        
        let emoji, theme;
        switch (weatherMain) {
            case 'Clear':
                emoji = '☀️'; theme = 'sunny';
                break;
            case 'Clouds':
                emoji = '☁️'; theme = 'cloudy';
                break;
            case 'Rain':
            case 'Drizzle':
                emoji = '🌧️'; theme = 'rainy';
                break;
            case 'Snow':
                emoji = '❄️'; theme = 'snowy';
                break;
            case 'Thunderstorm':
                emoji = '⛈️'; theme = 'stormy';
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                emoji = '🌫️'; theme = 'foggy';
                break;
            default:
                emoji = '🌈'; theme = 'sunny';
        }

        themeLink.href = `styles/${theme}.css`;
        document.body.className = `${theme}-theme`;
        
        document.querySelector('.rain').style.display = theme === 'rainy' ? 'block' : 'none';
        document.querySelector('.lightning').style.display = theme === 'stormy' ? 'block' : 'none';
        document.querySelector('.fog-layer').style.display = theme === 'foggy' ? 'block' : 'none';

        weatherDisplay.innerHTML = `
            <div class="emoji">${emoji}</div>
            <div class="details">
                <p><strong>Weather:</strong> ${description}</p>
                <p><strong>Temperature:</strong> ${temp}°C (feels like ${feelsLike}°C)</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
            </div>
        `;

        moodText.textContent = getWeatherMood(weatherMain, temp);

        document.getElementById('city-selection').style.display = 'none';
        changeCityButton.style.display = 'block';

    } catch (error) {
        weatherDisplay.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        console.error('Weather fetch error:', error);
    }
}

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherButton.click();
    }
});

changeCityButton.addEventListener('click', () => {
    document.getElementById('city-selection').style.display = 'flex';
    weatherDisplay.innerHTML = '';
    moodText.textContent = '';
    changeCityButton.style.display = 'none';
    cityInput.value = '';
    cityInput.focus();
});

window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
        cityInput.value = savedCity;
        fetchWeather(savedCity);
    }
});