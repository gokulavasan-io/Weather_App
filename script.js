const apiKey = "9008e8c2cfc6165966501d0dba568c31"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.ok) {
            const data = await response.json();

            document.querySelector(".city").textContent = data.name; // Corrected from data.main.name
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + " km/h";

            // Improved icon handling
            const weatherMain = data.weather[0].main;
            switch (weatherMain) {
                case "Clouds":
                    weatherIcon.src = "assets/images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "assets/images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "assets/images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "assets/images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "assets/images/mist.png";
                    break;
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            console.error("An error occurred: ", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred while fetching weather data: ", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
