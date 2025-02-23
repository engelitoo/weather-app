// Event listener for the search form
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Get the city name entered by the user in the search input field
  const searchInput = document.getElementById("search-input");
  const city = searchInput.value.trim(); // Remove extra spaces from the input

  // If the input is not empty, call the function to get weather data
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city.");
  }
});

// Function to fetch weather data from the SheCodes Weather API
function getWeatherData(city) {
  const apiKey = "ea7o6tce31c14df78ab0e8bc7ea17d99"; // Your API key
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  // Make the API request using Axios
  axios
    .get(apiUrl)
    .then((response) => {
      // Update the weather information on the page
      displayWeatherData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "Sorry, we couldn't find the weather for that city. Please try again."
      );
    });
}

// Function to display weather data on the page
function displayWeatherData(data) {
  // Update the city name
  const cityElement = document.getElementById("current-city");
  cityElement.textContent = data.city;

  // Update the temperature
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = Math.round(data.temperature.current);

  // Update the weather icon
  const weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.textContent = getWeatherIcon(data.condition.icon);

  // Update the weather description and time
  const dateTimeElement = document.getElementById("current-date-time");
  dateTimeElement.textContent = `${data.condition.description}, ${formatTime(
    data.time
  )}`;

  // Update humidity
  const humidityElement = document.getElementById("humidity");
  humidityElement.textContent = `${data.temperature.humidity}%`;

  // Update wind speed
  const windElement = document.getElementById("wind");
  windElement.textContent = `${data.wind.speed} km/h`;
}

// Function to format the time (optional)
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Function to get the weather icon based on the API icon code
function getWeatherIcon(iconCode) {
  const iconMap = {
    "01d": "☀️", // Clear sky (day)
    "01n": "🌙", // Clear sky (night)
    "02d": "⛅", // Few clouds (day)
    "02n": "⛅", // Few clouds (night)
    "03d": "☁️", // Scattered clouds
    "03n": "☁️", // Scattered clouds
    "04d": "☁️", // Broken clouds
    "04n": "☁️", // Broken clouds
    "09d": "🌧️", // Shower rain
    "09n": "🌧️", // Shower rain
    "10d": "🌦️", // Rain (day)
    "10n": "🌦️", // Rain (night)
    "11d": "⛈️", // Thunderstorm
    "11n": "⛈️", // Thunderstorm
    "13d": "❄️", // Snow
    "13n": "❄️", // Snow
    "50d": "🌫️", // Mist
    "50n": "🌫️", // Mist
  };

  return iconMap[iconCode] || "🌍"; // Default icon if code is not found
}
