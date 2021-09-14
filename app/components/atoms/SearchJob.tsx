import React, { useState } from "react";

export default function SearchJob(props) {
  return (
    <div className={`${props.styles} search-job`}>
      <div className="search-job__filter">
        <div className="search-job__keyword">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-job__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="search-job__input"
            type="text"
            placeholder="Job Type or Keyword"
          />
          {/* <div className="h-8 border-l-2" /> */}
        </div>
        <div className="search-job__divider"></div>
        <div className="search-job__city">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-job__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input className="search-job__input" type="text" placeholder="HCM" />
        </div>
      </div>
      <button type="button" className="search-job__button">
        Search
      </button>
    </div>
  );
}
