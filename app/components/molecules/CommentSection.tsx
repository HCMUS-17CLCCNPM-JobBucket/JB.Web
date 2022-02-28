import { blogAPI } from "app/api/modules/blogAPI";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import LoadingFullPage from "./LoadingFullPage";

export default function CommentSection({ blogId }) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [commentVal, setCommentVal] = useState("");
  const [comments, setComments] = useState([]);
  const user = useSelector((state: any) => state.user);

  //loading state
  const [loading, setLoading] = useState(false);

  const handleUserComment = async (e) => {
    e.preventDefault();
    if (user.token !== "") {
      const res = await blogAPI.comment({
        blogId,
        content: commentVal,
        parentId: null,
      });
      setCommentVal("");
      setShouldRefresh(!shouldRefresh);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await blogAPI.getCommentBlogById(blogId, {
        page: 0,
        size: 10,
        authorId: -1,
      });

      setComments(res.data.data.blogs[0].comments);
      setLoading(false);
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
      {loading ? (
        <LoadingFullPage />
      ) : (
        <Comments
          comments={comments}
          blogId={blogId}
          callback={() => setShouldRefresh(!shouldRefresh)}
        />
      )}
    </div>
  );
}
