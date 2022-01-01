import { ArrowLeftIcon } from "@heroicons/react/solid";
import { authAPI } from "app/api/modules/authAPI";
import ForgotPasswordLayout from "app/components/layouts/ForgotPasswordLayout";
import { useUserInfo } from "app/utils/hooks";
import router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function StepTwo() {
  const [code, setCode] = useState("");
  const user = useUserInfo();

  const handleNext = () => {
    // if (code.length !== 6) {
    //   toast("Please enter a valid code");
    //   return;
    // }
    router.push("/forgot-password/step-3");
    // authAPI
    //   .verifyEmail({ email: user.email, code })
    //   .then(() => {
    //     router.push("/forgot-password/step-3");
    //   })
    //   .catch((err) => toast(err.response.message));
  };

  return (
    <ForgotPasswordLayout>
      <div className="relative">
        <div className="w-1/3 mx-auto flex flex-col gap-4 py-12  text-center">
          <img
            src="/common/open-email.png"
            alt="email"
            className="h-24 w-24 p-4 bg-blue-100 rounded-lg mx-auto"
          />
          <p className="text-2xl font-semibold">Check your email</p>
          <p className="text-lg text-gray-400">
            We sent a verification code to your email.
          </p>

          {/* <input
            type="text"
            className="input"
            placeholder="312456"
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
          /> */}

          <button
            className="btn btn-primary w-full font-semibold"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        <button
          className="absolute top-10 left-10 font-semibold flex gap-4 items-center"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </button>
      </div>
    </ForgotPasswordLayout>
  );
}
