import { LockClosedIcon } from "@heroicons/react/solid";
import reviewAPI from "app/api/modules/reviewAPI";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RatingComponent from "../atoms/RatingComponent";
import SubReviewItem from "../atoms/SubReviewItem";

export default function ReviewSection({ companyId, callback }) {
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({
    content: "",
    organizationId: companyId,
    rating: 0,
    ratingBenefit: 0,
    ratingCulture: 0,
    ratingLearning: 0,
    ratingWorkspace: 0,
  });

  const handleReview = () => {
    const content = review.content.trim();
    if (
      content.length > 10 &&
      review.rating > 0 &&
      review.ratingBenefit > 0 &&
      review.ratingCulture > 0 &&
      review.ratingLearning > 0 &&
      review.ratingWorkspace > 0
    ) {
      setLoading(true);
      reviewAPI
        .addReview({ ...review, content, organizationId: companyId })
        .then((res) => {
          setReview({
            content: "",
            organizationId: 1,
            rating: 0,
            ratingBenefit: 0,
            ratingCulture: 0,
            ratingLearning: 0,
            ratingWorkspace: 0,
          });
          callback();
          toast.success("Review updated successfully");
          setLoading(false);
        });
    } else {
      toast.warn(
        "Rating must be greater than 0 and content must be more than 10 characters"
      );
    }
  };

  return (
    <div>
      <div className={`${loading && "opacity-50 cursor-not-allowed"}`}>
        <p className="text-2xl font-semibold">
          Review about Global Fashion Group
        </p>
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

      <div className="flex justify-between">
        <button
          disabled={user.token === ""}
          className={`${
            user.token === ""
              ? "rounded-lg bg-gray-400 flex gap-2 justify-center items-center cursor-not-allowed"
              : "btn btn-primary "
          } w-48 h-12`}
          onClick={handleReview}
        >
          {user.token === "" && <LockClosedIcon className="h-4 w-4" />}
          Review
        </button>
        <p className="text-sm text-red-600">Min 10 characters</p>
      </div>
    </div>
  );
}
