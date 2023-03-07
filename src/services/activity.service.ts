import axios from "axios";
import { headersConfig } from "./auth.service";

const API_URL = "http://localhost:8080/api/activity";

export const getUserActivity = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSharedByUserId = async (userId: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/share`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getLikedByUserId = async (userId: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/like`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserViews = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/view`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserShare = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/share`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserLike = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/like`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserBlocked = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/blocked`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getActivityByRessourceId = async (ressourceId: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/resource/${ressourceId}`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getActivityByCatalogueId = async (catalogId: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/catalogue/${catalogId}`, headersConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};