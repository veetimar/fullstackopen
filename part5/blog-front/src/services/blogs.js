import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.then(response => response.data)
}

export default { getAll, create, setToken }
