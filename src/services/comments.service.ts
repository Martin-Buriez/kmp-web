import axios from "axios";
import CommentListType from "../types/comment.type";
import PostListType from "../types/post.type";
import PostType from "../types/post.type";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/resource";


export const postComment = async (ressourceId: number, value: string): Promise<any> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const data = { "value": value };
  try {
    const response = await axios.post(`${API_URL}/${ressourceId}/comments`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentByRessourceId = async (ressourceId: number): Promise<CommentListType[]> => { 
  const headers = { 'Authorization': 'Bearer ' + getCurrentUser().accessToken };
  const response = await axios.get(`${API_URL}/${ressourceId}/comments`, { headers });
  return response.data;
};

export const getCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number): Promise<any> => {
  const token = getCurrentUser().accessToken;
  const config = {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': `Bearer ${token}` 
    }  };
  return axios
    .get((API_URL + "/" + ressouceId + "/comments/" + commentId), (config))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const putCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number, value: string): Promise<any> => {
  const token = getCurrentUser().accessToken;
  const config = {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': `Bearer ${token}` 
    }  };
  return axios
    .post((API_URL + "/" + ressouceId + "/comments/" + commentId), value, (config))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const deleteCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number): Promise<any> => {
  const token = getCurrentUser().accessToken;
  const config = {
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': `Bearer ${token}` 
    }  };
  return axios
    .delete((API_URL + "/" + ressouceId + "/comments/" + commentId), (config))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};