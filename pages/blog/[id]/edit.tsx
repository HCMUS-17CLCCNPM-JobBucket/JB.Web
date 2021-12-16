import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
import BlogForm from "app/components/organisms/BlogForm";
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
        const res = await blogAPI.update({
          id: blog.id,
          ...values,
          content,
          imageUrl: imageRes.data.url ? imageRes.data.url : "",
        });
        if (res.status === 200) {
          router.push("/" + blog.id);
        }
      } else {
        const res = await blogAPI.update({ id: blog.id, ...values, content });
        console.log(res);
        if (res.status === 200) {
          router.push("/blog/" + blog.id);
        }
      }
    },
  });

  return (
    <BlogForm
      id={blog.id}
      imageUrl={blog.imageUrl}
      title={blog.title}
      description={blog.description}
      content={blog.content}
      tags={[]}
      type={"edit"}
    />
  );
}
