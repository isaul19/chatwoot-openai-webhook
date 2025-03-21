import axios from "axios";

export const chatwootApi = axios.create({
  baseURL: "https://agent.2cloud.pe/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
