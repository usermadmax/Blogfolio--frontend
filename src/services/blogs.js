import axios from 'axios'
import { createElement } from 'react'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const update = async (id, updatedObject) => {
    const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}
const remove = async(id)=>{
  const config = {
    headers: { Authorization: token },
  }
  const response=await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}
export default { getAll, setToken, create ,update,remove}