import axios from "axios";

export const chatwootApi = axios.create({
  baseURL: "http://52.23.65.34/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
