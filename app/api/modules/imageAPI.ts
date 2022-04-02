import axios from "axios";

export const imageAPI = {
  uploadImage: (img) => {
    const formData = new FormData();
    console.log(img);
    formData.append("file", img);
    formData.append("upload_preset", "images");

    return axios.post(
      "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
      formData
    );
  },
  deleteImage: (id) => {
    return axios.post(
      "https://api.cloudinary.com/v1_1/derekzohar/image/destroy",
      {
        public_id: id,
      }
    );
  },

  uploadCV: (cv) => {
    const formData = new FormData();
    formData.append("file", cv);
    formData.append("upload_preset", "cv_preset");
    formData.append("api_key", "866395791528912");
    // formData.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
    // formData.append("public_id", "sample_image");
    // formData.append("timestamp", "1315060510");
    // formData.append("signature", "Jkfsl9pqxFuKSyUKL1fdDv5stv4");

    return axios.post(
      "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
      formData
    );
  },
};
