import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const getConfig = () => ({
  headers: {
    Authorization: token
  }
})

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = newObject => {
  const config = getConfig()
  const response = axios.post(baseUrl, newObject, config)
  return response.then(response => response.data)
}

const update = (newObject, id) => {
  const config = getConfig()
  const response = axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.then(response => response.data)
}

const remove = id => {
  const config = getConfig()
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, update, remove }
