import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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

export const getServerSideProps = async ({ params }) => {
  const res = await blogAPI.getByIdWithoutToken(parseInt(params.id));
  if (res.status === 200) return { props: { ...res.data.data } };
  return {
    props: { id: params.id },
  };
};

export default function AddNewBlog(props) {
  const blog = props.blogs[0];
  const user = useSelector((state: any) => state.user);

  console.log(blog);
  useEffect(() => {
    if (blog.authorId !== user.user.id) {
      router.push("/blog");
      toast("🦄 You are not author of this blog", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  const [content, setContent] = useState(blog.content);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(blog.imageUrl);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: blog.imageUrl,
      title: blog.title,
      description: blog.description,
      content: "",
      tags: [],
    },
    onSubmit: async (values) => {
      console.table(values);
      if (values.imageUrl === "") {
        const imageRes: any = await imageAPI.uploadImage(imageFile);
        const res = await blogAPI.update(
          {
            id: blog.id,
            ...values,
            content,
            imageUrl: imageRes.data.url ? imageRes.data.url : "",
          },
          user.token
        );
        if (res.status === 200) {
          router.push("/" + blog.id);
        }
      } else {
        const res = await blogAPI.update(
          { id: blog.id, ...values, content },
          user.token
        );
        console.log(res);
        if (res.status === 200) {
          router.push("/blog/" + blog.id);
        }
      }
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
        Update
      </button>
    </form>
  );
}
