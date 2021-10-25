import { blogAPI } from "app/api/modules/blogAPI";
import React, { useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import LikeButton from "./Button/LikeButton";
import DeleteAlert from "./DeleteAlert";
import Reply from "./ReplyComents";

export default function Comment({
  id,
  parentId,
  content,
  user,
  isInterested,
  interestCount,
  createdDate,
  updatedDate,
  children,
  blogId,
  callback,
}) {
  const userToken = useSelector((state: any) => state.user);
  const [commentVal, setCommentVal] = useState("");
  const [isReplied, setIsReplied] = useState(false);

  const [editState, setEditState] = useState({
    content: content,
    isEdited: false,
  });
  const handleEdit = async () => {
    const res = await blogAPI.updateComment(
      editState.content,
      id,
      userToken.token
    );
    console.log(res);
    setEditState({ ...editState, isEdited: false });
    callback();
  };
  const handleDelete = async () => {
    await blogAPI.delete(id, userToken.token);
    callback();
  };

  const handleSubComment = async () => {
    await blogAPI.addSubComment(
      { blogId: blogId, content: commentVal, parentId: id },
      userToken.token
    );
    setCommentVal("");
    setIsReplied(false);
    callback();
  };
  return (
    <div>
      {/* <DeleteAlert callback="" /> */}

      <div className="relative flex items-center group">
        <div className="flex">
          <div className="flex-shrink-0 mr-3 ">
            <img
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            />
          </div>
          {editState.isEdited ? (
            <div className="w-full flex flex-wrap -mx-3 mb-6 pl-12">
              <div className="w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-200 rounded-xl  leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 ease-in-transition"
                  placeholder="Type your new comment"
                  required
                  value={editState.content}
                  onChange={(e) =>
                    setEditState({ ...editState, content: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-full flex items-center px-3">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                  <svg
                    fill="none"
                    className="w-5 h-5 text-gray-600 mr-1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-red-400 md:text-sm pt-px">
                    Min 3 characters
                  </p>
                </div>
                <button className="btn primary-btn" onClick={handleEdit}>
                  Comment
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    setEditState({ ...editState, isEdited: false })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex items-center max-w-3xl">
                <div className="border rounded-xl px-4 py-2 sm:px-4 sm:py-2 leading-relaxed bg-gray-200">
                  <strong>{user.name}</strong>{" "}
                  <span className="text-xs text-gray-400"></span>
                  <p className="text-sm">{content}</p>
                </div>
                {/* toolbar */}
                {user.token !== "" && user.id === userToken.user.id && (
                  <div className="invisible flex gap-2 text-gray-400 group-hover:visible">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() =>
                        setEditState({ ...editState, isEdited: true })
                      }
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={handleDelete}
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="font-semibold px-4 text-gray-700 flex items-center space-x-1">
                <LikeButton
                  id={id}
                  type="comment"
                  isInterested={isInterested}
                  interestCount={interestCount}
                />
                <small className="self-center">.</small>
                <p
                  className="text-sm text-gray-700 cursor-pointer"
                  onClick={() => setIsReplied(true)}
                >
                  Reply
                </p>
                <small className="self-center">.</small>
                <small>
                  <Moment add={{ hours: 7 }} fromNow date={createdDate} />
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
      <Reply
        length={children?.length}
        childrenCmt={children}
        callback={callback}
      />
      {isReplied && (
        <div className="flex flex-wrap -mx-3 mb-6 pl-12">
          <div className="w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-200 rounded-xl  leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 ease-in-transition"
              name="body"
              placeholder={"Reply " + user.name}
              required
              value={commentVal}
              onChange={(e) => setCommentVal(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full flex items-center px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
              <svg
                fill="none"
                className="w-5 h-5 text-gray-600 mr-1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-red-400 md:text-sm pt-px">
                Min 3 characters
              </p>
            </div>
            <button className="btn primary-btn" onClick={handleSubComment}>
              Comment
            </button>
            <button className="btn" onClick={() => setIsReplied(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
