import axios from "axios";
import { Env } from "../adapters/env.adapter";

export const chatwootApi = axios.create({
  baseURL: "https://app.chatwoot.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    api_access_token: Env.CHATWOOT_API_KEY,
  },
});
