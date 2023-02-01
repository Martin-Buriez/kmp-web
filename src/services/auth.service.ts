import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/auth/";

export const register = (name: string, lastName: string, birthday: string, address: string, zipCode: string, email: string, password: string) => {
  return axios.post(API_URL + 'register', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    name, 
    lastName,
    birthday,  
    address, 
    zipCode, 
    email, 
    password
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};