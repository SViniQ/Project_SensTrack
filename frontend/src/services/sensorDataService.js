import api from './api';

export const listarDadosSensores = async () => {
  const response = await api.get('/sensors_data/all');
  return response.data;
};

export const buscarDadosMedios = async () => {
  const response = await api.get('/sensors_data/average?size=10');
  return response.data;
};

export const cadastrarDadosSensor = async (dadosSensor) => {
  const response = await api.post('/sensors_data', dadosSensor);
  return response.data;
};