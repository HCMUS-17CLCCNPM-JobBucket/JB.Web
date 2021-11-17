import axiosClient from "../axiosClient";

export const authAPI = {
  login: (params) => axiosClient.post("api/Authenticate/Login", { ...params }),
  loginWithGoogle: (values) =>
    axiosClient.post(
      "api/Authenticate/login/google",
      {},
      { params: { ...values } }
    ),
  register: (params) => {
    const url = "api/Authenticate/register";
    return axiosClient.post(url, { ...params });
  },
  verifyEmail: (params) =>
    axiosClient.get("/api/Authenticate/ConfirmEmail", { params: params }),
  resend: (email) =>
    axiosClient.get("api/Authenticate/ResendConfirmationEmail", {
      params: { email },
    }),
  resetPassword: (email) => {
    return axiosClient.get("api/Authenticate/ResetPassword", {
      params: { email },
    });
  },
  confirmResetPassword: (email) => {
    return axiosClient.post("api/Authenticate/confirmResetPassword", {
      params: { email },
    });
  },
  getAccessToken: (token) => {
    return axiosClient.post("api/Authenticate/refreshToken", {
      refreshToken: token,
    });
  },
};
