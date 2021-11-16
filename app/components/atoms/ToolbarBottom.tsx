import helper from "app/utils/helper";
import router from "next/router";
import React, { useEffect, useState } from "react";

export default function ToolbarBottom() {
  const [isShow, setIsShow] = useState(false);
  const handleScrollToTop = () => helper.scrollToTop();

  useEffect(() => {
    //show scroll to top button if scroll position is greater than 100
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {router.pathname !== "/chat" && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 w-10">
          <button
            onClick={handleScrollToTop}
            className={
              (!isShow && "hidden") + " p-2 rounded-full border border-gray-700"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button className="">
            <img src="/common/chat.png" alt="chat" className="h-10 w-10" />
          </button>
        </div>
      )}
    </div>
  );
}
