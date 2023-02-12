import axios from "axios";
import CatalogueListType from "../types/catalogue.type";
import CatalogueType from "../types/catalogue.type";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/catalogue";

export const getAllCatalogues = async (): Promise<CatalogueListType[]> => {
    const token = getCurrentUser().accessToken;
    const config = {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': `Bearer ${token}` 
      }
    };
    try {
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCatalogueById = async (catalogueid: number): Promise<CatalogueType> => {
  const token = getCurrentUser().accessToken;
  const config = {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': `Bearer ${token}` 
    }  };
  return axios
    .get((API_URL + "/" + catalogueid), (config))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postCatalogue = async (category: string): Promise<any> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "category": category };
  try {
    const response = await axios.post(`${API_URL}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putCatalogue = async (catalogueid: number, category: string): Promise<any> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "category": category };
  try {
    const response = await axios.put((API_URL + "/" + catalogueid), data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCatalogue = async (catalogueid: number): Promise<any> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  try {
    const response = await axios.delete((API_URL + "/" + catalogueid), { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postViewCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/view/" + bool), data, { headers })
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postShareCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/share/" + bool), data, { headers })
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postLikeCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/like/" + bool), data, { headers })
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postBlockCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/block/" + bool), data, { headers })
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};