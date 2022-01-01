import { authAPI } from "app/api/modules/authAPI";
import ForgotPasswordLayout from "app/components/layouts/ForgotPasswordLayout";
import { updateEmail } from "app/redux/features/user";
import router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function StepOne() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleNext = () => {
    authAPI.resetPassword(email).then(async (res) => {
      if (res.status === 200) {
        dispatch(updateEmail(email));
        router.push("/forgot-password/step-2");
      }
    });
  };

  return (
    <ForgotPasswordLayout>
      <div className="w-1/3 mx-auto flex flex-col gap-4 py-12">
        <p className="text-2xl font-semibold">Reset Password</p>
        <p className="text-lg text-gray-400">
          {
            "Enter your email address and we'll send you a Verification Code to reset your password."
          }
        </p>

        <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="text"
            className="input"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-full font-semibold"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="h-32"></div>
    </ForgotPasswordLayout>
  );
}
