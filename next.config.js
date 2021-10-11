module.exports = {
  reactStrictMode: true,
  target: "serverless",
  env: {
    BASE_URL: "https://jobbucket.azurewebsites.net/",
    url: "https://jobbucket.azurewebsites.net/",
    loginAPI: "/api/user/login",
    confirmEmailAPI: "/api/user/confirmEmail",
    confirmResetPasswordAPI: "/api/user/confirmResetPassword",
    resetPasswordAPI: "/api/user/resetPassword",
    registerAPI: "/api/user/register",
    jobAPI: "/api/job",
  },
};
