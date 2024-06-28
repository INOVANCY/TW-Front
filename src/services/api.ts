import axios from "axios";
import https from "https";

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
  },
});

export default api;
