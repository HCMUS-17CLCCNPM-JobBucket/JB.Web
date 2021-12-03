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
          await blogAPI.unlikeComment(props.id, user.token);
          setInterestCount(interestCount - 1);
          setIsInterested(false);
        } else {
          await blogAPI.likeComment(props.id, user.token);
          setInterestCount(interestCount + 1);
          setIsInterested(true);
        }
      } else {
        if (isInterested) {
          await blogAPI.unlike(props.id, user.token);
          setInterestCount(interestCount - 1);
          setIsInterested(false);
        } else {
          await blogAPI.like(props.id, user.token);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-600"
          viewBox="0 0 20 20"
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          aria-label="Number of likes"
          className="w-4 h-4 fillCurrent text-blue-600"
        >
          <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
          <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
        </svg>
      )}
      <span>{interestCount}</span>
    </button>
  );
}
