export const getAvatar = (url) =>
  url !== "" && url !== "string" && url !== undefined
    ? url
    : "https://ov-cms.s3.ap-south-1.amazonaws.com/B2B/AdminPanel/CMS/AGY427/Images/09102019022455.png";
