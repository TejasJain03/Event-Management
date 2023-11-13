import axios from 'axios';

const instance = axios.create({
  baseURL: "https://event-management-api-beige.vercel.app",
  withCredentials: true,
});

export default instance;
