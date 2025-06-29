import axios from 'axios'

const baseApiUrl = import.meta.env.VITE_API_URL // Will use full URL in production

const login = async credentials => {
  const response = await axios.post(`${baseApiUrl}/login`, credentials)
  return response.data
}

export default { login }
