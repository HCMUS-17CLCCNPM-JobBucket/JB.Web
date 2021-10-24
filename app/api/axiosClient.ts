import axios from "axios";
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
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
