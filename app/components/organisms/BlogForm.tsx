import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const config = {
  placeholderText: "Edit Your Content Here!",
  charCounterCount: true,
  imageUploadURL: "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
  imageUploadParams: {
    api_key: "866395791528912",
    upload_preset: "images",
  },
  imageUploadMethod: "POST",
  events: {
    "froalaEditor.image.uploaded": (e, editor, response) => {
      response = JSON.parse(response);
      editor.image.insert(response.url, true, null, editor.image.get(), null);
      // return false;
    },
  },
};
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

export default function BlogForm(props) {
  const [tags, setTags] = useState(props.tags);
  const [content, setContent] = useState(props.content);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(props.imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };
  const handleRedirect = (res) => {
    if (res.data.errors) {
      toast.warning("Please fill all the fields");
    } else
      router.push(
        "/blog/" +
          (props.type === "edit" ? props.id : res.data.data.blog.add.id)
      );
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: props.imageUrl,
      title: props.title,
      description: props.description,
      content: props.content,
      tags: props.tags,
    },
    onSubmit: async (values) => {
      if (previewSource !== "") {
        const imageRes: any = await imageAPI.uploadImage(imageFile);
        const res = await blogAPI.handleBlogByType(
          props.id,
          {
            ...values,
            tags,
            content,
            imageUrl: imageRes.data.url ? imageRes.data.url : "",
          },
          props.type
        );
        handleRedirect(res);
      } else {
        const res = await blogAPI.handleBlogByType(
          props.id,
          {
            ...values,
            tags,
            content,
          },
          props.type
        );
        handleRedirect(res);
      }
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      <p className="text-2xl font-semibold">
        {router.pathname === "/blog/post" ? "Add New Blog" : "Edit Blog"}
      </p>
      <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} />

      <BlogTagSelection value={tags} setValue={setTags} />
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
        config={config}
        model={content}
        onModelChange={(model) => setContent(model)}
      />

      <button className="btn btn-primary w-40" type="submit">
        Post
      </button>
    </form>
  );
}
