import React from "react";

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function SalaryRange({ minSalary, maxSalary }) {
  return (
    <p>
      {formatNumber(minSalary)} - {formatNumber(maxSalary)}
    </p>
  );
}
