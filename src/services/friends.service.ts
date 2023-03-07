import axios from "axios";
import { Relation } from "../types/relation.type";
import { headersConfig } from "./auth.service";

const API_URL = "http://localhost:8080/api/friend";


export const postFriendRequest = async (userId: number, relation: Relation): Promise<any> => { 
    const data = { "test": 'test'}
    try {
      const response = await axios.post(`${API_URL}/request/add/${userId}/${relation}`, data, headersConfig);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const postAcceptFriendRequest = async (userId: number, relation: Relation): Promise<any> => { 
    const data = { "test": 'test'}
    try {
      const response = await axios.post(`${API_URL}/add/${userId}/${relation}`, data, headersConfig);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getFriends = async (): Promise<any> => { 
    try {
      const response = await axios.get(`${API_URL}/user/active`, headersConfig);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getFriendsByRelation = async (relation: Relation): Promise<any> => { 
      try {
      const response = await axios.get(`${API_URL}/relation/${relation}`, headersConfig);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};


export const getFriendsRequest = async (): Promise<any> => { 
    try {
      const response = await axios.get(`${API_URL}/request`, headersConfig);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};



