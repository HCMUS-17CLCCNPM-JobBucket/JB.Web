import { store } from "app/redux/store";
import axios from "axios";
import Router from "next/router";
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.defaults.timeout = 20000;
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
