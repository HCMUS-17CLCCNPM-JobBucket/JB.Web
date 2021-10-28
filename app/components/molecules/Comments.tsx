import { blogAPI } from "app/api/modules/blogAPI";
import React from "react";
import Comment from "../atoms/Comment";
import DeleteAlert from "../atoms/DeleteAlert";

export default function Comments(props) {
  return (
    <div className="antialiased ">
      <div className="space-y-4">
        {props.comments?.map((item, index) => (
          <Comment
            {...item}
            key={index}
            blogId={props.blogId}
            callback={props.callback}
          />
        ))}
      </div>
    </div>
  );
}
