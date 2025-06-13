// src/services/sensorService.js
import api from './api'

export const getSensors = async () => {
  try {
    const data = await api.get('/sensors')
    return data
  } catch (error) {
    throw error
  }
}

export const createSensor = async (sensorData) => {
  try {
    const data = await api.post('/sensors', sensorData)
    return data
  } catch (error) {
    throw error
  }
}

// Exemplo: enviar leitura manual
export const enviarLeituraManual = async (dados) => {
  try {
    const data = await api.post('/leituras', dados)
    return data
  } catch (error) {
    throw error
  }
}