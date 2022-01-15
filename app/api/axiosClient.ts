import { toast } from "react-toastify";
import { getAccessToken, getRefreshToken } from "app/redux/store";
import axios from "axios";
// Set up default config for http requests here
import { store } from "app/redux/store";
import { getNewAccessToken, login, logout } from "app/redux/features/user";
import { authAPI } from "./modules/authAPI";

const { dispatch } = store;

const axiosClient = axios.create({
  baseURL: "https://api.jobbucket.xyz",
  headers: {
    "content-type": "application/json",
  },
});

const urlExclude = [
  "api/Authenticate/login",
  "api/Authenticate/register",
  "api/Authenticate/forgotPassword",
  "api/Authenticate/resetPassword",
  "api/Authenticate/verifyEmail",
  "api/Authenticate/verifyResetPassword",
  "api/Authenticate/refreshToken",
];
axiosClient.interceptors.request.use(
  (config) => {
    if (urlExclude.includes(config.url)) return config;

    const token = getAccessToken();
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
axiosClient.defaults.timeout = 20000;
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       authAPI.getAccessToken(getRefreshToken()).then((res) => {
//         if (res.status === 200) {
//           dispatch(getNewAccessToken(res.data.accessToken));
//         } else {
//           dispatch(logout());
//         }
//       });
//     } else toast(error.response.data.message, { type: "error" });

//     return error;
//   }
// );
export default axiosClient;
