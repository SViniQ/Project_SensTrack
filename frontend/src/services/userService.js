import api from './api';

export const cadastrarUsuario = async (usuario) => {
  const response = await api.post('/users', usuario);
  return response.data;
};

export const listarUsuarios = async () => {
  const response = await api.get('/users');
  return response.data;
};