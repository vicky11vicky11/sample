import { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./Component/NavBar";

const api = {
	baseUrl: "https://api.openweathermap.org/data/2.5/weather",
	key: "e8aedebef4f3d54478b8c38d6c4a6df4",
};

const App = () => {
	const [currentWeather, setCurrentWeather] = useState({});
	const [searchedWeather, setSearchedWeather] = useState({});
	const [city, setCity] = useState("");

	// Function to fetch weather data based on city name
	function handleSearch() {
		fetch(`${api.baseUrl}?q=${city}&appid=${api.key}&units=metric`)
			.then((res) => res.json())
			.then((d) => {
				setSearchedWeather(d);
				console.log(d);
			});
	}

	// Function to fetch weather data based on current location
	function fetchWeatherByLocation(lat, lon) {
		fetch(`${api.baseUrl}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`)
			.then((res) => res.json())
			.then((d) => {
				setCurrentWeather(d);
				console.log(d);
			});
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				fetchWeatherByLocation(latitude, longitude);
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}, []);

	return (
		<>
			<NavBar></NavBar>
			<div className="container">
				<div className="search-weather">
					<h1>Welcome to SkyCast</h1>
					<h2>Check Your city weather here 🌦🌨</h2>

					<input
						className="input"
						onChange={(e) => setCity(e.target.value)}
						placeholder="Enter city name"
					/>
					<button className="button" onClick={handleSearch}>
						Search
					</button>

					{/* {
      searchedWeather.main !== undefined && (
        <div className="searched-weather">
          <p>City: {searchedWeather.name}</p>
          <p>Temperature: {searchedWeather.main.temp} °C</p>
          <p>Weather: {searchedWeather.weather[0].main}</p>
          <p>Description: {searchedWeather.weather[0].description}</p>
        </div>
      )
    } */}

					{searchedWeather.main === undefined ? (
						<p className="weather-info">Not Found</p>
					) : (
						<div className="weather-info">
							<p>{searchedWeather.name}</p>
							<p>Latitude: {searchedWeather.coord?.lat}</p>
							<p>Longitude: {searchedWeather.coord?.lon}</p>
							<p>{searchedWeather.main.temp} °C</p>
							<p>{searchedWeather.weather[0].main}</p>
							<p>{searchedWeather.weather[0].description}</p>
						</div>
					)}
				</div>

				{currentWeather.main !== undefined && (
					<div className="current-weather">
						<p>Current Location: {currentWeather.name}</p>
						<p>Latitude: {currentWeather.coord?.lat}</p>
						<p>Longitude: {currentWeather.coord?.lon}</p>
						<p>Temperature: {currentWeather.main.temp} °C</p>
						<p>Weather: {currentWeather.weather[0].main}</p>
						<p>Description: {currentWeather.weather[0].description}</p>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
