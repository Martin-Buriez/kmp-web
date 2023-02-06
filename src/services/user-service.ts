import axios from "axios";
import UserType from "../types/user.type";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/user";

export const getUserInfos = (): Promise<UserType> => {
    const token = getCurrentUser().accessToken;
    const config = {
      headers: { 'Authorization': 'Bearer ' + token }
    };
    return axios
      .get((API_URL + "/actual"), (config))
      .then((response) => {
        JSON.stringify(response.data)
        return response.data;
      });
  };