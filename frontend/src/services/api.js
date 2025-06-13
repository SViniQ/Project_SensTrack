import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL,
  timeout: 10000,
})

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.message || 'Erro na resposta do servidor',
      })
    } else if (error.request) {
      return Promise.reject({
        message: 'Sem resposta do servidor. Verifique a conexão.',
      })
    } else {
      return Promise.reject({
        message: error.message,
      })
    }
  }
)

export default api