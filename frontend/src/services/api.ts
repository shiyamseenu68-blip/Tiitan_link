const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = {
  async get(endpoint: string) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  },

  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async put(endpoint: string, data: any) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async delete(endpoint: string) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  },

  async patch(endpoint: string, data?: any) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    return response.json()
  },
}
