import api from './api';

export const cadastrarSensor = async (sensor) => {
  const response = await api.post('/sensors', sensor);
  return response.data;
};

export const listarSensores = async () => {
  const response = await api.get('/sensors');
  return response.data;
};