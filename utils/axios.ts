import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
