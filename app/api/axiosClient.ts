import { getAccessToken } from "app/redux/store";
import axios from "axios";
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: "http://api.jobbucket.xyz",
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
// axiosClient.defaults.timeout = 20000;
axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      console.log("You are not authorized");
    }
    return response;
  },
  (error) => {}
);
export default axiosClient;
