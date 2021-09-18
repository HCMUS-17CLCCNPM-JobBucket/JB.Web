import React, { useState } from "react";
// import ErrorAlert from "../../app/components/atoms/error-alert";
import validateEmail from "app/utils/validateEmail";
import axios from "axios";
import { useRouter } from "next/router";
// import UserAPI from "app/api/modules/userAPI";
import Head from "next/head";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const handleNext = async () => {
    switch (step) {
      case 0:
        if (email === "") {
          setOpenAlert(true);
        } else {
          if (!validateEmail(email)) {
            setOpenAlert(true);
          } else {
            // const res = await UserAPI.resetPassword({
            //   params: { email: email },
            // });
            // res.status === 200 && setStep(step + 1);
            // await axios
            //   .get(process.env.url + process.env.resetPasswordAPI, {
            //     params: { email: email },
            //   })
            //   .then((res) => {
            //     setStep(step + 1);
            //     // handleNext();
            //   })
            //   .catch((error) => console.log(error));
          }
        }
        break;
      case 1:
        if (password === "" || confirmPassword === "" || token === "")
          setOpenAlert(true);
        else {
          // const res = await UserAPI.confirmResetPassword({
          //   email: email,
          //   resetToken: token,
          //   password: password,
          //   confirmPassword: confirmPassword,
          // });
          // res.status === 200 && setStep(step + 1);
          // await axios
          // .post(process.env.url + process.env.confirmResetPasswordAPI, {
          //   email: email,
          //   resetToken: token,
          //   password: password,
          //   confirmPassword: confirmPassword,
          // })
          //   .then((res) => {
          //     setStep(step + 1);
          //   })
          //   .catch((error) => console.log(error));
        }
        break;
      case 2:
        router.push("/login");
        break;
    }
  };
  const handlePrevious = () => step - 1 >= 0 && setStep(step - 1);

  let ret;
  switch (step) {
    case 0:
      // ret = (
      //   <div className=" relative ">
      //     <label htmlFor="name-with-label" className="text-gray-700">
      //       Please fill your email in below input to we send verify token.
      //     </label>
      //     <input
      //       type="email"
      //       id="name-with-label"
      //       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      //       name="email"
      //       placeholder="Your email"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //     />
      //   </div>
      // );

      ret = (
        <div className="flex flex-col mb-2">
          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <svg
                width={15}
                height={15}
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
              </svg>
            </span>
            <input
              type="text"
              id="sign-in-email"
              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      );

      break;
    case 1:
      // ret = (
      //   <div className=" relatives">
      //     <label htmlFor="name-with-label" className="text-gray-700">
      //       Please fill your email in below input to we send verify token.
      //     </label>
      //     <input
      //       type="text"
      //       id="token"
      //       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      //       name="token"
      //       placeholder="Code"
      // value={token}
      // onChange={(e) => setToken(e.target.value)}
      //     />
      //     <input
      //       type="password"
      //       id="password"
      //       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      //       name="password"
      //       placeholder="Password"
      //       value={password}
      //       onChange={(e) => setPassword(e.target.value)}
      //     />
      //     <input
      //       type="password"
      //       id="confirmPassword"
      //       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      //       name="confirmPassword"
      //       placeholder="CofirmPassword"
      //       value={confirmPassword}
      //       onChange={(e) => setConfirmPassword(e.target.value)}
      //     />
      //   </div>
      // );

      ret = (
        <div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="sign-in-token"
                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="sign-in-password"
                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              id="sign-in-confirmPassword"
              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      );
      break;
    case 2:
      ret = (
        <div className="flex flex-col mb-2">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block text-black-500">
              Change password success.
            </span>
          </h2>
        </div>
      );
      break;
  }

  return (
    <div className="h-full pt-20">
      <Head>
        <title>Forgot Password | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handlePrevious}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white text-md font-medium">
          Forgot Password
        </div>
        <div className="mt-8">
          {/* <form action="#" autoComplete="off"> */}
          {ret}

          {/* {openAlert && <ErrorAlert str="Email empty or wrong format" />} */}

          <div className="flex w-full mt-4">
            <button
              // type="submit"
              className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={handleNext}
            >
              {step === 2 ? "Login" : "Next"}
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
{
  /* <div>
  {ret}
   {openAlert && <ErrorAlert str="Email empty or wrong format" />} 
  <div className="flex items-center w-1/2">
    <button
      type="button"
      className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2"
      onClick={handlePrevious}
    >
      Previous
    </button>
    <button
      type="button"
      className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
</div>; */
}
