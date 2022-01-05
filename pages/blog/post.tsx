import BlogForm from "app/components/organisms/BlogForm";
import React from "react";

export default function AddNewBlog() {
  return (
    <BlogForm
      id={""}
      imageUrl={""}
      title={""}
      description={""}
      content={""}
      tags={[]}
      type={"post"}
    />
  );
}
