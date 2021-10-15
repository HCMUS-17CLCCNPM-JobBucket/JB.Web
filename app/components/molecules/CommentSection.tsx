import { blogAPI } from "app/api/modules/blogAPI";
import React from "react";
import Comment from "../atoms/Comment";

export default function CommentSection(props) {
  return (
    <div className="antialiased ">
      <div className="space-y-4">
        {props.comments?.map((item, index) => (
          <Comment {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
