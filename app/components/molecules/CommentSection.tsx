import { blogAPI } from "app/api/modules/blogAPI";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

export default function CommentSection({ blogId }) {
  const user = useSelector((state: any) => state.user);

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [commentVal, setCommentVal] = useState("");
  const [comments, setComments] = useState([]);

  const handleUserComment = async (e) => {
    e.preventDefault();
    const res = await blogAPI.comment(
      {
        blogId,
        content: commentVal,
        parentId: null,
      },
      user.token
    );
    setCommentVal("");
    setShouldRefresh(true);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await blogAPI.getCommentBlogById(
        blogId,
        {
          // isDescending: true,
          page: 0,
          size: 10,
          // sortBy: "comments.createDate",
          // keyword: "",
          // createdDate: [],
          // tags: [],
          // authorId: 1,
        },
        user.token
      );
      //   setBlogInfo({
      //     ...blogInfo,
      //     isInterested: res.data.data.blogs[0].isInterested,
      //   });

      setComments(res.data.data.blogs[0].comments);
    };
    fetchComments();
  }, [shouldRefresh]);
  return (
    <div>
      <CommentInput
        comment={commentVal}
        setComment={setCommentVal}
        callback={handleUserComment}
      />
      <Comments
        comments={comments}
        blogId={blogId}
        callback={() => setShouldRefresh(!shouldRefresh)}
      />
    </div>
  );
}
