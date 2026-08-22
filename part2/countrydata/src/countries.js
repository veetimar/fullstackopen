import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(`${baseUrl}/all`).then((response) => response.data)
}

const getWeather = (latlng) => {
    const key = import.meta.env.VITE_WEATHER
    const [latitude, longitude] = latlng

    return axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
      .then((response) => response.data)
}

export default { getAll, getWeather }
