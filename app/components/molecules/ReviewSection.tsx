import reviewAPI from "app/api/modules/reviewAPI";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import RatingComponent from "../atoms/RatingComponent";

function SubReviewItem({ label, value, callback }) {
  return (
    <div className="flex items-center">
      <p className="w-40">{label}</p>
      <RatingComponent value={value} callback={callback} />
    </div>
  );
}

export default function ReviewSection({ companyId }) {
  const user = useSelector((state: any) => state.user);
  const [review, setReview] = useState({
    content: "",
    organizationId: 1,
    rating: 0,
    ratingBenefit: 0,
    ratingCulture: 0,
    ratingLearning: 0,
    ratingWorkspace: 0,
  });

  const handleReview = () => {
    reviewAPI
      .addReview({ ...review, organizationId: companyId }, user.token)
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <div>
        <p className="text-2xl font-semibold">
          Review about Global Fashion Group
        </p>
        <div className="flex mt-4">
          <p className="text-xl font-semibold w-40">Overall rating</p>
          <RatingComponent
            value={review.rating}
            callback={(value) => {
              setReview({ ...review, rating: value });
            }}
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

      <button className="btn btn-primary w-48 h-12 " onClick={handleReview}>
        Review
      </button>
    </div>
  );
}
