import axios from "axios";

export const imageAPI = {
  uploadImage: (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "images");

    return axios.post("https://api.cloudinary.com/v1_1/derekzohar/image/upload", formData);
  },
};
