import React, { useState, useEffect } from 'react'
import axios from 'axios';
const Weather = ({  capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  // variable api_key has now the value set in startup
  const [weather, setWeather] = useState([]);
  const hook = () => {
    axios
      .get('http://api.weatherstack.com/current?access_key=a7ef16f36854b12f26ebacc7d9fb9a8d&query=New%20York')
      .then((response) => {
        setWeather(response.data.current);
      }) }
 
  useEffect(hook, [])
  return (
    <div>
    <h2>Weather in {capital}</h2>
    <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
    <img src={weather.weather_icons}  />
    <p><strong>wind:</strong> {weather.wind_speed} km/h direction {weather.wind_dir}</p>
    </div>
  )}
const Countries = ({ countriesToShow, setCountriesToShow}) => {
    if  (countriesToShow.length === 1) return null;
    return (countriesToShow.map((country) => (
      <div key={country.name.official}> {country.name.common}
      <button onClick={() =>  setCountriesToShow([country])}>show</button></div>
    )))}
const RestCountriesData = ({ country }) => { 
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Country Area Size: {country.area} km2</div>
      <p>Population: {country.population}</p>
      <h2>Languages: </h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>)) }
      </ul>
          <img src={country.flags.png} alt={`${country.name.common} flag`} /> 
          <Weather capital={country.capital} />
    </div>
  );};
const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  useEffect(() => { 
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    } )})
  const handleChangeQuery = (event) => { 
    const find = event.target.value;
    setQuery(find)
    setCountriesToShow(countries.filter((country) =>
      country.name.common.toLowerCase().includes(find.toLowerCase())
    ))}
  return (
    <div>
      <p>Find Countries <input value={query} onChange={handleChangeQuery} /></p>
      {countriesToShow.length === 1 ? (
        <RestCountriesData country={countriesToShow[0]} /> ) : null}
        {countriesToShow.length > 10 ?  (
          <p>Too many matches, please do specify another filter</p>
        ) : (
          <Countries countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow} />)}
    </div>
  );
};
export default App;
