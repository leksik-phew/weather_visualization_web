const apiKey = '0994cb9a7f5f97d6002c4ed0aba6afa6'; 
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather-button');
const weatherDisplay = document.getElementById('weather-display');
const themeLink = document.getElementById('theme-link');

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`
        );

        if (!response.ok) {
            throw new Error('Город не найден');
        }
        const data = await response.json();
        
        localStorage.setItem('city', city);
        
        const weatherMain = data.weather[0].main;        
        const description = data.weather[0].description; 
        const temp = Math.round(data.main.temp);        
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        
        let emoji = '';
        let theme = '';
        if (weatherMain === 'Clear') {
            emoji = '☀️'; theme = 'sunny';
        } else if (weatherMain === 'Clouds') {
            emoji = '☁️'; theme = 'cloudy';
        } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
            emoji = '🌧️'; theme = 'rainy';
        } else if (weatherMain === 'Snow') {
            emoji = '❄️'; theme = 'snowy';
        } else if (weatherMain === 'Thunderstorm') {
            emoji = '⛈️'; theme = 'stormy';
        } else if (weatherMain === 'Mist' || weatherMain === 'Fog' || weatherMain === 'Haze') {
            emoji = '🌫️'; theme = 'foggy';
        } else {
            emoji = '🌈'; theme = 'sunny';
        }
        
        themeLink.href = `styles/${theme}.css`;
        document.body.className = `${theme}-theme`;

        
        weatherDisplay.innerHTML = `
            <div class="emoji">${emoji}</div>
            <div class="details">
                <p><strong>Погода:</strong> ${description}</p>
                <p><strong>Температура:</strong> ${temp}&deg;C (ощущается как ${feelsLike}&deg;C)</p>
                <p><strong>Влажность:</strong> ${humidity}%</p>
            </div>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
        console.error(error);
    }
}

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        document.getElementById('city-selection').style.display = 'none';
        changeCityButton.style.display = 'inline-block';

    }
});

window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('city');
    changeCityButton.style.display = 'inline-block';

    if (savedCity) {
        cityInput.value = savedCity;
        fetchWeather(savedCity);
        document.getElementById('city-selection').style.display = 'none';
    }
});

const changeCityButton = document.getElementById('change-city-button');

changeCityButton.addEventListener('click', () => {
    document.getElementById('city-selection').style.display = 'flex';
    weatherDisplay.innerHTML = '';
    changeCityButton.style.display = 'none';
});
