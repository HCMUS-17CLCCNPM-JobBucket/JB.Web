import { ThumbUpIcon } from "@heroicons/react/outline";
import reviewAPI from "app/api/modules/reviewAPI";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import StarIconSolid, { StarIconOutline } from "../atoms/Icons/StarIcon";
import RatingComponent from "../atoms/RatingComponent";
import ReviewSection from "./ReviewSection";

function ReviewItem(props) {
  return (
    <div className="flex items-start">
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
        <div className="flex justify-between">
          <div>
            <p className="flex items-baseline">
              <span className="text-gray-600 font-bold">{props.user.name}</span>
              {/* <span className="ml-2 text-green-600 text-xs">
                Verified Buyer
              </span> */}
            </p>
            <div className="flex items-center mt-1">
              <RatingComponent value={props.rating} callback={() => {}} />
            </div>
          </div>
          <button className="flex items-center ml-6">
            <ThumbUpIcon className="w-5 h-5" />
            <span className="ml-2">{props.interestCount}</span>
          </button>
        </div>
        <div className="flex items-center mt-4 text-gray-600">
          <div className="flex items-center">
            <span className="text-sm">Benefit Rating</span>
            <RatingComponent value={props.ratingBenefit} callback={() => {}} />
          </div>
          <div className="flex items-center ml-4">
            <span className="text-sm">Learning Rating</span>
            <RatingComponent value={props.ratingLearning} callback={() => {}} />
          </div>
          <div className="flex items-center ml-4">
            <span className="text-sm">Culture Rating</span>
            <RatingComponent value={props.ratingCulture} callback={() => {}} />
          </div>
          <div className="flex items-center ml-4">
            <span className="text-sm">Workspace Rating</span>
            <RatingComponent
              value={props.ratingWorkspace}
              callback={() => {}}
            />
          </div>
        </div>
        <div className="mt-3">
          {/* <span className="font-bold">Sapien consequat eleifend!</span> */}
          <p className="mt-1">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
function SubReviewItem({ label, value, callback }) {
  return (
    <div className="flex items-center">
      <p className="w-40">{label}</p>
      <RatingComponent value={value} callback={callback} />
    </div>
  );
}

export default function ReviewOrg({ companyId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    reviewAPI.getReviewByCompany({ companyId }).then((res) => {
      setReviews(res.data.data.reviews);
    });
  }, []);

  return (
    <div className="p-8 shadow-lg rounded-lg mt-4 flex flex-col gap-8">
      <ReviewSection companyId={companyId} />
      <hr className="divide-y" />
      <div className="">
        <p className="text-xl font-semibold">{21} Employee reviews</p>
        <div className="flex flex-col gap-8 mt-8">
          {reviews.map((review, index) => (
            <ReviewItem key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
