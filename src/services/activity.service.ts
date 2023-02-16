import axios from "axios";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/activity";

export const getUserActivity = async (): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSharedByUserId = async (userId: number): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/${userId}/share`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getLikedByUserId = async (userId: number): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/${userId}/like`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserViews = async (): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/view`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserShare = async (): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/share`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserLike = async (): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/like`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserBlocked = async (): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/user/blocked`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getActivityByRessourceId = async (ressourceId: number): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/resource/${ressourceId}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getActivityByCatalogueId = async (catalogId: number): Promise<any[]> => {
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
        const response = await axios.get(`${API_URL}/catalogue/${catalogId}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};