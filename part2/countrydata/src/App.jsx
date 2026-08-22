import { useState, useEffect } from 'react'
import countryService from './countries'

const Countries = ({ countries, show, weather }) => {
  if (countries.length === 0) {
    return null
  }
  if (countries.length > 10) {
    return (
      <div>
        <p>
          Too many matches, specify another filter
        </p>
      </div>
    )
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => show(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    )
  }
  return <CountryInfo country={countries[0]} weather={weather} />
}

const CountryInfo = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map((ent) => <li key={ent[0]}>{[ent[1]]}</li>)}
      </ul>
      <img src={country.flags.png} />
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }
  return (
    <div>
      <h2>
        Weather in {weather.name}
      </h2>
      <p>
        Temperature {weather.main.temp} Celsius
      </p>
      <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} />
      <p>
        Wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

const Search = (props) => {
  return (
    <div>
      <p>
        find countries <input value={props.value} onChange={props.onChange} />
      </p>
    </div>
  )
}

const App = () => {
  const [newValue, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries))
  }, [])

  useEffect(() => {
    if (filtered.length === 1) {
      countryService.getWeather(filtered[0].capitalInfo.latlng).then((response) => setWeather(response))
    }
  }, [filtered])

  const handleChange = (event) => {
    const value = event.target.value
    setValue(value)
    if (value === "") {
      setFiltered([])
      return
    }
    setFiltered(countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  const showCountry = (name) => {
    const country = countries.find((country) => country.name.common === name)
    setFiltered([country])
  }

  return (
    <>
      <Search value={newValue} onChange={handleChange} />
      <Countries countries={filtered} show={showCountry} weather={weather} />
    </>
  )
}

export default App
