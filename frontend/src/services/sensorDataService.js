import api from './api';

export const cadastrarDadosSensor = async (dadosSensor) => {
  const response = await api.post('/sensor-data', dadosSensor);
  return response.data;
};

export const listarDadosSensores = async () => {
  const response = await api.get('/sensor-data');
  return response.data;
};