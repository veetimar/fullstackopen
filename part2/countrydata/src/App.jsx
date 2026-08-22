import { useState, useEffect } from 'react'
import countryService from './countries'

const Countries = ({ countries }) => {
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
        {countries.map((country) => <div key={country.name.common}>{country.name.common}</div>)}
      </div>
    )
  }
  return <CountryInfo country={countries[0]} />
}

const CountryInfo = ({ country }) => {
  console.log(country.languages)
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

  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries))
  }, [])

  const handleChange = (event) => {
    const value = event.target.value
    setValue(value)
    if (value === "") {
      setFiltered([])
      return
    }
    setFiltered(countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <>
      <Search value={newValue} onChange={handleChange} />
      <Countries countries={filtered} />
    </>
  )
}

export default App
