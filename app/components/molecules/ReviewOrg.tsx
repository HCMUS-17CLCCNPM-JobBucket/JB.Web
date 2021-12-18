import reviewAPI from "app/api/modules/reviewAPI";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewItem from "../atoms/ReviewItem";
import ReviewSection from "./ReviewSection";

export default function ReviewOrg({ companyId }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const user = useSelector((state: any) => state.user);
  const [status, setStatus] = useState({
    loading: false,
    refresh: false,
  });

  useEffect(() => {
    setStatus({
      ...status,
      loading: true,
    });
    reviewAPI.getReviewByCompany(companyId, page).then((res) => {
      setReviews(res.data.data.reviews);
    });
    setStatus({
      ...status,
      loading: false,
    });
  }, [status.refresh]);

  const handleRefresh = () =>
    setStatus({
      ...status,
      refresh: !status.refresh,
    });

  return (
    <div className="p-8 shadow-lg rounded-lg mt-4 flex flex-col gap-8">
      <ReviewSection companyId={companyId} callback={handleRefresh} />

      <hr className="divide-y" />
      <div className="">
        <p className="text-xl font-semibold">{21} Employee reviews</p>
        <div className="flex flex-col gap-8 mt-8">
          {reviews.map((review, index) => (
            <ReviewItem
              key={index}
              {...review}
              callback={handleRefresh}
              isAuthor={review.user.id === user.user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
