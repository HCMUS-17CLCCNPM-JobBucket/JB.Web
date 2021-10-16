import React, { useState } from "react";
import dynamic from "next/dynamic";
import DropFileInput from "app/components/atoms/DropFile";
import axios from "axios";
import config from "next/dist/next-server/server/config";
import { imageAPI } from "app/api/modules/imageAPI";
import { useFormik } from "formik";
import { blogAPI } from "app/api/modules/blogAPI";
import { useSelector } from "react-redux";
import Selection from "app/components/atoms/Selection";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
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
  const user = useSelector((state: any) => state.user);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      title: "",
      description: "",
      content: "",
      tags: [],
    },
    onSubmit: async (values) => {
      const imageRes: any = await imageAPI.uploadImage(imageFile);
      const res = await blogAPI.add(
        {
          ...values,
          imageUrl: imageRes.data.url,
          content,
        },
        user.token
      );

      if (res.status === 200) console.log(res);
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      {/* <DropFileInput /> */}

      <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} />
      {/* <div className="flex justify-between">
        <div></div>
      </div> */}

      <BlogTagSelection />
      <input
        type="text"
        id="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        className=" rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
        placeholder="Title"
      />
      <label className="text-gray-700">
        <textarea
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 
          bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base 
          focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="description"
          placeholder="Enter your description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
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
        model={content}
        onModelChange={(model) => setContent(model)}
      />

      <button className="btn btn-primary w-40" type="submit">
        Post
      </button>
    </form>
  );
}
