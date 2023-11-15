import axios from 'axios';

const instance = axios.create({
  baseURL: "https://event-management-api-iota.vercel.app",
  withCredentials: true,
});

export default instance;
