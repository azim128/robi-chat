import axios from "axios";

const baseUrl = import.meta.env.API_BASE_URL

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
});

export const getResponse = (msg, language) =>
  Axios.post("/webhooks/rest/webhook", {
    sender: "user1",
    message: msg,
    language,
  });