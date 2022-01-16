import reviewAPI from "app/api/modules/reviewAPI";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";
import ReviewItem from "../atoms/ReviewItem";
import ReviewSection from "./ReviewSection";

export default function ReviewOrg({ companyId, setRatingPercent }) {
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [status, setStatus] = useState({
    page: 1,
    loading: false,
    refresh: false,
    hasMore: false,
  });

  // useEffect(() => {
  //   if (status.page > 1) {
  //     // setStatus({
  //     //   ...status,
  //     //   loading: true,
  //     // });
  //     reviewAPI.getReviewByCompany(companyId, status.page).then((res) => {
  //       setReviews([...reviews, ...res.data.data.reviews.reviewResponses]);
  //       setStatus({
  //         ...status,
  //         // loading: false,
  //         hasMore: res.data.data.reviews.reviewResponses > 0,
  //       });
  //     });
  //   }
  // }, [status.page]);

  useEffect(() => {
    if (status.page === 1) {
      setStatus({
        ...status,
        loading: true,
      });
      reviewAPI.getReviewByCompany(companyId, 1).then((res) => {
        setReviews(res.data.data.reviews.reviewResponses);
        setRatingPercent({
          data: res.data.data.reviews.ratingPercentages,
          total: res.data.data.reviews.reviewResponses.length,
        });
      });
      setStatus({
        ...status,
        loading: false,
      });
    }
  }, [status.refresh]);

  const handleRefresh = () =>
    setStatus({
      ...status,
      refresh: !status.refresh,
    });

  const fetchMoreData = () => {
    setStatus({
      ...status,
      page: status.page + 1,
    });
  };
  return (
    <div className="p-8 shadow-lg rounded-lg mt-4 flex flex-col gap-8">
      <ReviewSection companyId={companyId} callback={handleRefresh} />

      <hr className="divide-y" />
      <div className="">
        <p className="text-xl font-semibold">{reviews.length} reviews</p>
        <div className="flex flex-col gap-8 mt-8">
          {/* {reviews.map((review, index) => (
            <ReviewItem
              key={index}
              {...review}
              callback={handleRefresh}
              isAuthor={review.user.id === user.user.id}
            />
          ))} */}
          {status.loading ? (
            <Loading />
          ) : reviews.length === 0 && status.loading === false ? (
            <ListEmpty message="No result match" />
          ) : (
            <InfiniteScroll
              dataLength={reviews.length}
              next={fetchMoreData}
              hasMore={status.hasMore}
              loader={<Loading />}
              scrollableTarget="scrollableDiv"
              className="flex flex-col gap-4 p-4 min-h-40 w-full"
            >
              {reviews.map((item, index) => (
                <ReviewItem
                  key={index}
                  {...item}
                  callback={handleRefresh}
                  isAuthor={item.user.id === user.user.id}
                />
              ))}
            </InfiniteScroll>
          )}
          {/* {!hasMore && <p className="text-center">No more data</p>} */}
        </div>
      </div>
    </div>
  );
}
