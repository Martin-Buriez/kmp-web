import axios from "axios";
import authHeader from "./auth-header";
import UserType from "../types/user.type";
import { headersConfig } from "./auth.service";

const LOGIN_API_URL = "http://localhost:8080/api/auth/login";

export const getPublicContent = () => {
  return axios.get(LOGIN_API_URL);
};

export const getUserBoard = () => {
  return axios.get(LOGIN_API_URL + "user", { headers: authHeader() });
};

const API_URL = "http://localhost:8080/api/user";

export const getCurrentUserInfos = (): Promise<UserType> => {
  return axios
    .get((API_URL + "/actual"), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    });
};

export const getUserInfosById = (userId: number): Promise<UserType> => {
  return axios
    .get((API_URL + "/id/" + userId), headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    });
};

export const getAllUsers = (): Promise<UserType[]> => {
  return axios
    .get((API_URL + "/all"), headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    });
};