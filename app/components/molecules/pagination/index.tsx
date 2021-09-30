import React, { useState, useEffect } from "react";

function PaginationItem({ value, currentPage }) {
  return (
    <p
      className={`${
        value === currentPage
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 "
      } cursor-pointer flex items-center hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 px-4 py-2 mx-1 transition-colors duration-200 transform rounded-md dark:bg-gray-800 dark:text-gray-200 `}
      // onClick={setCurrentPage}
    >
      {value}
    </p>
  );
}

export default function Pagination({ pages, currentPage, setCurrentPage }) {
  let n = Math.floor(pages / 10) === 0 ? 1 : Math.floor(pages / 10) + 1;
  if (pages === 10) n = 1;
  //Set number of pages
  const numberOfPages = [];
  for (let i = 1; i <= n; i++) {
    numberOfPages.push(i);
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState<any>(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  }, [currentButton]);

  return (
    <div className="flex">
      <p
        className={`${
          currentPage > 1
            ? "cursor-pointer text-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
            : "cursor-not-allowed text-gray-500"
        } flex items-center px-4 py-2 mx-1  bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 transition-colors duration-200 transform`}
        onClick={() =>
          setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
        }
      >
        Previous
      </p>
      {arrOfCurrButtons.map((item, index) => (
        <div key={index} onClick={() => setCurrentButton(item)}>
          <PaginationItem
            key={item}
            value={item}
            currentPage={currentPage}
            // setCurrentPage={setCurrentButton(item)}
          />
        </div>
      ))}

      <a
        className={`${
          currentPage < n
            ? "cursor-pointer text-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
            : "cursor-not-allowed text-gray-500"
        } flex items-center px-4 py-2 mx-1  bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 transition-colors duration-200 transform`}
        onClick={() =>
          setCurrentButton((prev) =>
            prev >= numberOfPages.length ? prev : prev + 1
          )
        }
      >
        Next
      </a>
    </div>
  );
}
