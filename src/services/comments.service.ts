import axios from "axios";
import CommentListType from "../types/comment.type";
import { headersConfig } from "./auth.service";

const API_URL = "http://localhost:8080/api/resource";


export const postComment = async (ressourceId: number, value: string): Promise<any> => { 
  const data = { "value": value };
  try {
    const response = await axios.post(`${API_URL}/${ressourceId}/comments`, data, headersConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentByRessourceId = async (ressourceId: number): Promise<CommentListType[]> => { 
  const response = await axios.get(`${API_URL}/${ressourceId}/comments`, headersConfig);
  return response.data;
};

export const getCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number): Promise<any> => {
  return axios
    .get((API_URL + "/" + ressouceId + "/comments/" + commentId), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const putCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number, value: string): Promise<any> => {
  const data = {
    "value": value
  }
  return axios
    .put((API_URL + "/" + ressouceId + "/comments/" + commentId), data, (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};

export const deleteCommentByRessourceIdAndByCommentId = async (ressouceId: number, commentId: number): Promise<any> => {
  return axios
    .delete((API_URL + "/" + ressouceId + "/comments/" + commentId), (headersConfig))
    .then((response) => {
      JSON.stringify(response.data)
      return response.data;
    }); 
};