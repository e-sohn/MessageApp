import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

const updateToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const dropToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common["Authorization"];
};

//////////////User LOGIN and REGISTRATION ///////////////////

// Register
const createUser = async (data) => {
  const resp = await api.post(`/users`, data);
  return resp.data;
};
// Login
const loginUser = async (data) => {
  const resp = await api.post(`/users/login`, data);
  return resp.data;
};

export {
  updateToken,
  dropToken,
  createUser,
  loginUser,
}
