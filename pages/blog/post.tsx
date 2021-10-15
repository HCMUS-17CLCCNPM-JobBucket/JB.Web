import React, { useState } from "react";
import dynamic from "next/dynamic";
import DropFileInput from "app/components/atoms/DropFile";
import axios from "axios";
import config from "next/dist/next-server/server/config";
// Require Editor CSS files.
const FroalaEditorComponent: React.ComponentType<any> = dynamic(
  () => {
    return new Promise((resolve) =>
      import("froala-editor/js/plugins.pkgd.min.js").then((e) => {
        import("react-froala-wysiwyg").then(resolve);
      })
    );
  },
  {
    loading: () => null,
    ssr: false,
  }
);
export default function AddNewBlog() {
  const [previewSource, setPreviewSource] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setPreviewSource(URL.createObjectURL(e.target.files[0]));

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "i2xhwizu");

    axios
      .post(
        "http://api.cloundinary.com/v1_1/derekzohar/image/upload",
        formData
      )
      .then((res) => console.log(res));
  };

  return (
    <div className="px-48 py-4 flex flex-col gap-4">
      {/* <DropFileInput/>
      <input
        type="text"
        id="title"
        className=" rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
        name="title"
        placeholder="Your name"
      /> */}
      <img src={previewSource} alt="" className="h-20 w-20" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload</button>
      <label className="text-gray-700">
        <textarea
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 
          bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base 
          focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="description"
          placeholder="Enter your description"
          name="description"
          rows={5}
          cols={40}
        ></textarea>
      </label>
      <FroalaEditorComponent
        tag="textarea"
        config={{
          placeholderText: "Edit Your Content Here!",
          charCounterCount: true,
        }}
      />
    </div>
  );
}
