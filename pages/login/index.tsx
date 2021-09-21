// import UserAPI from "app/api/modules/userAPI";
// import { useGoogleAuth } from "app/components/layouts/google-provider";
// import { login } from "app/redux/features/user";
import { authAPI } from "app/api/modules/authAPI";
import { useGoogleAuth } from "app/components/layouts/google-provider";
import { login } from "app/redux/features/user";
import { clear } from "console";
import { useFormik } from "formik";
import Head from "next/head";
// import { useDispatch } from "react-redux";
import router from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function Login() {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid username format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: async (values) => {
      setIsLogin(true);
      const res = await authAPI.login(values);
      if (res.status === 200) {
        dispatch(login(res.data));

        router.push("/");
      }
    },
  });

  const { signIn, googleUser, isSigned } = useGoogleAuth();
  const googleAuth = useGoogleAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authAPI.loginWithGoogle({
        GoogleId: googleAuth.googleUser.googleId,
        TokenId: googleAuth.googleUser.tokenId,
      });
      if (res.status === 200) {
        // setIsLogin(true);
        dispatch(login(res.data.data));
        googleAuth.signOut();

        router.push("/");
      }
    };
    if (googleAuth.isSignedIn) fetchData();
  }, [googleAuth.isSignedIn]);

  return (
    <div className="lg:flex flex justify-center ">
      <Head>
        <title>Login | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-16 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Log in
          </h2>
          <button
            type="button"
            className="py-2 px-4 mt-2 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={googleAuth.signIn}
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Sign in with Google
          </button>
          <div className="mt-12">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  username Address
                </div>

                <input
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  type="username"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your username"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <a
                      className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                      onClick={() => router.push("/forgot-password")}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                  required
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-md tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                  type="submit"
                  // onClick={() => }
                >
                  {isLogin ? (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Dont have an account ?{" "}
              <a
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                onClick={() => router.push("/sign-up")}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
