import React from "react";
import Rating from "react-rating";
import StarIconSolid, { StarIconOutline } from "./Icons/StarIcon";

export default function RatingComponent({ value, callback, styles, quiet }) {
  return (
    <Rating
      readonly={quiet}
      quiet={quiet}
      emptySymbol={
        <StarIconOutline
          styles={`${styles === "sub-rating" ? "h-4 w-4" : "h-8 w-8"}`}
        />
      }
      fullSymbol={
        <StarIconSolid
          styles={`${styles === "sub-rating" ? "h-4 w-4" : "h-8 w-8"}`}
        />
      }
      initialRating={value}
      onChange={callback}
    />
  );
}
