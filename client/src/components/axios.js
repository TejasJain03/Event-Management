import axios from 'axios';

const instance = axios.create({
  baseURL: "https://event-management-api-fawn.vercel.app",
  withCredentials: true,
});

export default instance;
