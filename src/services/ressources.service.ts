import axios from "axios";
import PostListType from "../types/post.type";
import PostType from "../types/post.type";
import { Relation } from "../types/relation.type";
import { headersConfig } from "./auth.service";

const API_URL = "http://localhost:8080/api/resources";

export const getAllRessources = async (): Promise<PostListType> => {
    try {
        const response = await axios.get(API_URL, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRessourceById = async (ressouceId: number): Promise<PostType> => {
  return axios
    .get((API_URL + "/" + ressouceId), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const getRessourceByCategoryId = async (categoryId: number): Promise<PostType> => {
  return axios
    .get((API_URL + "/" + "category" + "/" + categoryId), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postRessource = async (catalogId: number, access: Relation | 'Veuillez entrer un accès', content: string): Promise<any> => { 
  const data = { "access": access, "value": content };
  try {
    const response = await axios.post(`${API_URL}/add/${catalogId}`, data, headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putRessource = async (catalogId: number, access: Relation | 'public', content: string, ressourceId: number): Promise<any> => { 
  const data = { "category": catalogId, "access": access, "value": content };
  try {
    const response = await axios.put((API_URL + "/" + ressourceId + "/" + catalogId), data, headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRessource = async (ressouceId: number): Promise<any> => { 
  try {
    const response = await axios.delete((API_URL + "/" + ressouceId), headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postViewRessource = async (ressouceId: number, bool: boolean): Promise<PostType> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + ressouceId + "/view/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postShareRessource = async (ressouceId: number, bool: boolean): Promise<PostType> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + ressouceId + "/share/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postLikeRessource = async (ressouceId: number, bool: boolean): Promise<PostType> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + ressouceId + "/like/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postBlockRessource = async (ressouceId: number, bool: boolean): Promise<PostType> => {
  const data = { "test": 'test'}
  return axios
    .post((API_URL + "/" + ressouceId + "/block/" + bool), data, headersConfig)
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};