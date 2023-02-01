import axios from "axios";
import { getCurrentUser } from "./auth.service";

const API_URL = "http://localhost:8080/api/user";

export const getUserInfos = () => {
    const token = getCurrentUser().accessToken;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return axios
      .get((API_URL + "/actual"), (config))
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };