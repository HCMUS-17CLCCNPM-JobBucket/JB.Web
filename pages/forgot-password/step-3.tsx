import { authAPI } from "app/api/modules/authAPI";
import ForgotPasswordLayout from "app/components/layouts/ForgotPasswordLayout";
import { useUserInfo } from "app/utils/hooks";
import router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function StepOne() {
  const user = useUserInfo();

  const [passwordObj, setPasswordObj] = useState({
    password: "",
    confirmPassword: "",
    resetToken: "",
  });

  const handleSubmit = () => {
    authAPI
      .confirmResetPassword({ ...passwordObj, email: user.email })
      .then((res) => {
        if (res.status === 200) {
          toast("Password reset successfully");
          router.push("/login");
        }
      });
  };

  const handleResend = () => {
    authAPI.resend(user.email).then((res) => {
      if (res.status === 200) toast("Resend successfully");
    });
  };
  return (
    <ForgotPasswordLayout>
      <div className="relative">
        <div className=" w-1/3 mx-auto flex flex-col gap-4 py-12">
          <p className="text-2xl font-semibold">Create new password</p>
          <p className="text-lg text-gray-400">
            Enter your new password and confirm it.
          </p>

          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="User123!@#"
              value={passwordObj.password}
              onChange={(e) =>
                setPasswordObj({ ...passwordObj, password: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="User123!@#"
              value={passwordObj.confirmPassword}
              onChange={(e) =>
                setPasswordObj({
                  ...passwordObj,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verification Code
              </label>
              <div className=" flex gap-2 items-center">
                <input
                  type="text"
                  className="input"
                  placeholder="312034"
                  value={passwordObj.resetToken}
                  onChange={(e) =>
                    setPasswordObj({
                      ...passwordObj,
                      resetToken: e.target.value,
                    })
                  }
                />
                <button
                  className="w-24 h-full font-semibold text-blue-600"
                  onClick={handleResend}
                >
                  Resend
                </button>
              </div>
            </div>
          </div>

          <button
            className="mt-4 btn btn-primary w-full font-semibold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </ForgotPasswordLayout>
  );
}
