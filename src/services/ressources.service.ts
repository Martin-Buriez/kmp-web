import axios from "axios";
import PostListType from "../types/post.type";
import PostType from "../types/post.type";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/resources";

export const getAllRessources = async (): Promise<PostListType> => {
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

export const getRessourceById = async (ressouceId: number): Promise<PostType> => {
  const token = getCurrentUser().accessToken;
  const config = {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': `Bearer ${token}` 
    }  };
  return axios
    .get((API_URL + "/" + ressouceId), (config))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const postRessource = async (catalogId: number, access: string, content: string): Promise<any> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "access": access, "value": content };
  try {
    const response = await axios.post(`${API_URL}/add/${catalogId}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};