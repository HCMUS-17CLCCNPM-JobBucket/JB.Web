import React from "react";
import Rating from "react-rating";
import StarIconSolid, { StarIconOutline } from "./Icons/StarIcon";

export default function RatingComponent({ value, callback }) {
  return (
    <Rating
      emptySymbol={<StarIconOutline styles="h-8 w-8" />}
      fullSymbol={<StarIconSolid styles="h-8 w-8" />}
      initialRating={value}
      onChange={callback}
    />
  );
}
