import axios from "axios";

const baseUrl = "http://18.136.177.139:5005"

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

  
