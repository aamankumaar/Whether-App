// Selecting DOM elements
let input = document.getElementById("cityname");
let searchbtn = document.getElementById("searchbtn");
let cityNameElement = document.getElementById("city");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let weatherIcon = document.getElementById("weather-icon");

// OpenWeather API Key (Replace with your actual key)
const API_KEY = "fff9d4d91bb39137fad098d28005b258";

// Function to fetch weather data
const fetchWeather = async (cityName) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(api);

        // If the city is not found, show an error message
        if (!response.ok) {
            throw new Error(`City not found (Error ${response.status})`);
        }

        const data = await response.json();

        // Update UI with weather details
        cityNameElement.textContent = `Weather in ${data.name}`;
        temp.textContent = `${data.main.temp}°C`;
        description.textContent = `${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;

        // Update weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.alt = data.weather[0].description;
    } catch (error) {
        console.error("Error fetching data:", error);
        cityNameElement.textContent = "City not found";
        temp.textContent = "";
        description.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";
        weatherIcon.src = "";
    }
};

// Event Listener for Search Button
searchbtn.addEventListener("click", () => {
    let cityname = input.value.trim();

    if (cityname) {
        fetchWeather(cityname);
        input.value = "";
        input.focus();
    } else {
        cityNameElement.textContent = "Please enter a city name";
    }
});

// Fetch default city weather when the page loads
fetchWeather("Muzaffarpur");
