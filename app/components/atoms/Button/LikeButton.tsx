import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid";
import { blogAPI } from "app/api/modules/blogAPI";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function LikeButton(props) {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [isInterested, setIsInterested] = useState(props.isInterested);
  const [interestCount, setInterestCount] = useState(props.interestCount);
  const handleLike = async () => {
    if (user.token !== "")
      if (props.type === "comment") {
        if (isInterested) {
          await blogAPI.unlikeComment(props.id);
          setInterestCount(interestCount - 1);
          setIsInterested(false);
        } else {
          await blogAPI.likeComment(props.id);
          setInterestCount(interestCount + 1);
          setIsInterested(true);
        }
      } else {
        if (isInterested) {
          await blogAPI.unlike(props.id);
          setInterestCount(interestCount - 1);
          setIsInterested(false);
        } else {
          await blogAPI.like(props.id);
          setInterestCount(interestCount + 1);
          setIsInterested(true);
        }
      }
    else {
      toast("Please login to continue", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <button
      onClick={handleLike}
      type="button"
      disabled={user.token === ""}
      className={
        (user.token === "" ? "cursor-not-allowed" : "") +
        " flex items-center p-1 space-x-1.5"
      }
    >
      {isInterested ? (
        <ThumbUpIconSolid className="w-5 h-5 text-blue-600" />
      ) : (
        <ThumbUpIconSolid className="w-5 h-5 text-gray-600" />
      )}
      <span>{interestCount}</span>
    </button>
  );
}
