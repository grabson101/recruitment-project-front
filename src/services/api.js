import axios from 'axios'

export async function fetchPrivateData(token) {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/private`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  return data
}

export async function fetchCountries(token) {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/countries`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : []
}