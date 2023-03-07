import axios from "axios";
import CatalogueListType from "../types/catalogue.type";
import CatalogueType from "../types/catalogue.type";
import { headersConfig } from "./auth.service";

const API_URL = "http://localhost:8080/api/catalogue";

export const getAllCatalogues = async (): Promise<CatalogueListType[]> => {
    try {
        const response = await axios.get(API_URL, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCatalogueById = async (catalogueid: number): Promise<CatalogueType> => {
  return axios
    .get((API_URL + "/" + catalogueid), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postCatalogue = async (category: string): Promise<any> => { 
  const data = { "category": category };
  try {
    const response = await axios.post(`${API_URL}`, data, headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putCatalogue = async (catalogueid: number, category: string): Promise<any> => { 
  const data = { "category": category };
  try {
    const response = await axios.put((API_URL + "/" + catalogueid), data, headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCatalogue = async (catalogueid: number): Promise<any> => { 
  try {
    const response = await axios.delete((API_URL + "/" + catalogueid), headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postViewCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/view/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postShareCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/share/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postLikeCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/like/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postBlockCatalogue = async (catalogueid: number, bool: boolean): Promise<any> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + catalogueid + "/block/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};