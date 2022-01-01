import router from "next/router";
import React from "react";

export default function ForgotPasswordLayout(props) {
  const steps = [
    {
      title: "Step 1",
      content: "Enter your email address",
      url: "/forgot-password/step-1",
    },
    {
      title: "Step 2",
      content: "Verify your email address",
      url: "/forgot-password/step-2",
    },
    {
      title: "Step 3",
      content: "Create new password",
      url: "/forgot-password/step-3",
    },
  ];
  return (
    <div className="w-3/4 m-auto">
      <div className="grid grid-cols-3 gap-4 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${
              router.pathname === step.url
                ? "border-blue-500"
                : "border-gray-300 "
            } border-t-4 pt-4`}
          >
            <p className="uppercase text-blue-500 font-bold">{step.title}</p>
            <p className="font-semibold">{step.content}</p>
          </div>
        ))}
      </div>
      <hr className="my-2" />
      {props.children}
    </div>
  );
}
