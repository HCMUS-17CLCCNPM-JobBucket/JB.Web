import { Popover } from "@headlessui/react";
import {
  DotsVerticalIcon,
  PencilIcon,
  ThumbUpIcon as ThumbUpIconSolid,
  TrashIcon,
} from "@heroicons/react/solid";
import reviewAPI from "app/api/modules/reviewAPI";
import React, { useState } from "react";
import Moment from "react-moment";
import { toast } from "react-toastify";
import RatingComponent from "../atoms/RatingComponent";
import ReviewSection from "../molecules/ReviewSection";
import SubReviewItem from "./SubReviewItem";

function PopoverItem({ icon, label, callback }) {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-200 flex gap-4 rounded-lg cursor-pointer"
      onClick={callback}
    >
      {icon}
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}

function ReviewEditSection(props) {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({
    content: props.content,
    rating: props.rating,
    ratingBenefit: props.ratingBenefit,
    ratingCulture: props.ratingCulture,
    ratingLearning: props.ratingLearning,
    ratingWorkspace: props.ratingWorkspace,
  });

  const handleReview = () => {
    if (
      review.content.length > 0 &&
      review.rating > 0 &&
      review.ratingBenefit > 0 &&
      review.ratingCulture > 0 &&
      review.ratingLearning > 0 &&
      review.ratingWorkspace > 0
    ) {
      setLoading(true);
      reviewAPI.updateReview({ ...review, id: props.id }).then((res) => {
        setReview({
          content: "",
          rating: 0,
          ratingBenefit: 0,
          ratingCulture: 0,
          ratingLearning: 0,
          ratingWorkspace: 0,
        });
        props.handleCloseEdit();
        props.handleRefresh();
        toast.success("Review updated successfully");
        setLoading(false);
      });
    } else {
      toast.warn("Please fill all fields");
    }
  };
  return (
    <div
      className={`${props.reviewId !== null && "p-8 rounded-lg bg-blue-100 "} ${
        loading && "opacity-50 cursor-not-allowed"
      }`}
    >
      <div>
        <div className="flex mt-4">
          <p className="text-xl font-semibold w-40">Overall rating</p>
          <RatingComponent
            styles=""
            value={review.rating}
            callback={(value) => {
              setReview({ ...review, rating: value });
            }}
            quiet={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SubReviewItem
          label="Benefit rating"
          value={review.ratingBenefit}
          callback={(value) => setReview({ ...review, ratingBenefit: value })}
        />
        <SubReviewItem
          label="Learning rating"
          value={review.ratingLearning}
          callback={(value) => setReview({ ...review, ratingLearning: value })}
        />
        <SubReviewItem
          label="Culture rating"
          value={review.ratingCulture}
          callback={(value) => setReview({ ...review, ratingCulture: value })}
        />
        <SubReviewItem
          label="Workspace rating"
          value={review.ratingWorkspace}
          callback={(value) => setReview({ ...review, ratingWorkspace: value })}
        />
      </div>
      <textarea
        className="mt-4 input min-h-[150px]"
        placeholder="Write your review here"
        value={review.content}
        onChange={(e) => setReview({ ...review, content: e.target.value })}
      />

      <div className="flex gap-4 text-white">
        <button
          className="btn btn-primary text-white w-48 h-12 "
          onClick={handleReview}
        >
          Update
        </button>
        <button
          className="rounded-lg bg-gray-400 w-48 h-12 "
          onClick={props.handleCloseEdit}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function ReviewItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState({
    isInterested: props.isInterested,
    interestCount: props.interestCount,
  });
  const handleLike = async () => {
    const res = await reviewAPI.likeReview(props.id);
    setStatus({
      isInterested: res.data.data.review.interest.isInterested,
      interestCount: res.data.data.review.interest.interestCount,
    });
  };

  const handleEdit = () => setIsEdit(true);

  const handleDelete = async () => {
    const res = await reviewAPI.deleteReview(props.id);
    props.callback();
  };

  return (
    <div>
      {isEdit === true ? (
        <ReviewEditSection
          {...props}
          id={props.id}
          reviewId={props.id}
          handleCloseEdit={() => setIsEdit(false)}
          handleRefresh={props.callback}
        />
      ) : (
        <div className="relative flex items-start">
          <div className="flex-shrink-0">
            <div className="inline-block relative">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                  src={props.user.avatarUrl || "/avatar/avatar.png"}
                  alt="Profile picture"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner" />
              </div>
              {props.isAuthor && (
                <svg
                  className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                </svg>
              )}
            </div>
          </div>
          <div className="ml-6">
            <div>
              <p className="flex items-baseline">
                <span className="text-gray-600 font-bold">
                  {props.user.name}
                </span>
                {/* <span className="ml-2 text-green-600 text-xs">
                Verified Buyer
              </span> */}
              </p>
              <div className="flex items-center mt-1">
                <RatingComponent
                  quiet={true}
                  styles=""
                  value={props.rating}
                  callback={() => {}}
                />
              </div>
            </div>
            <hr />
            <div className="flex gap-8 items-start mt-4 text-gray-600">
              <div>
                <div className="flex  w-40 justify-between">
                  <span className="text-sm">Benefit</span>
                  <RatingComponent
                    styles="sub-rating"
                    quiet={true}
                    value={props.ratingBenefit}
                    callback={() => {}}
                  />
                </div>
                <div className="flex w-40 justify-between">
                  <span className="text-sm">Learning</span>
                  <RatingComponent
                    styles="sub-rating"
                    quiet={true}
                    value={props.ratingLearning}
                    callback={() => {}}
                  />
                </div>
              </div>
              <div>
                <div className="flex w-40 justify-between">
                  <span className="text-sm">Culture</span>
                  <RatingComponent
                    styles="sub-rating"
                    quiet={true}
                    value={props.ratingCulture}
                    callback={() => {}}
                  />
                </div>
                <div className="flex w-40 justify-between">
                  <span className="text-sm">Workspace</span>
                  <RatingComponent
                    styles="sub-rating"
                    quiet={true}
                    value={props.ratingWorkspace}
                    callback={() => {}}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-3">
              {/* <span className="font-bold">Sapien consequat eleifend!</span> */}
              <p className="mt-1">{props.content}</p>

              <div className="flex gap-2 items-center">
                <button
                  className="flex items-center justify-center"
                  onClick={handleLike}
                >
                  {status.isInterested ? (
                    <ThumbUpIconSolid className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ThumbUpIconSolid className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="ml-1">{status.interestCount}</span>
                </button>
                ·
                <p className="text-sm text-gray-600">
                  <Moment date={props.createdDate} fromNow />
                </p>
              </div>
            </div>
          </div>

          {props.isAuthor && (
            <div className="my-auto mx-8">
              <Popover className="relative">
                <Popover.Button>
                  <DotsVerticalIcon className="h-8 w-8 p-2 rounded-full hover:bg-gray-200" />
                </Popover.Button>

                <Popover.Panel className="absolute z-10 w-[200px] bg-white">
                  <div className="flex flex-col gap-2  rounded-lg shadow-lg p-1">
                    <PopoverItem
                      icon={<PencilIcon className="w-4 h-4" />}
                      label="Edit Comment"
                      callback={handleEdit}
                    />
                    <PopoverItem
                      icon={<TrashIcon className="h-4 w-4" />}
                      label="Delete Comment"
                      callback={handleDelete}
                    />
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
