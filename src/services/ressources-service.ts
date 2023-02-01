import axios from "axios";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/ressources/";

export const getAllRessources = () => {
    const token = getCurrentUser().accessToken;
    const config = {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': `Bearer ${token}` 
      }
    };
    return axios
      .get((API_URL), (config))
      .then((response) => {
        JSON.stringify(response.data);
        return response.data;
      });
};