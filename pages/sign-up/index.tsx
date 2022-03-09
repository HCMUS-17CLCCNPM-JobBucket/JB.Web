import { authAPI } from "app/api/modules/authAPI";
import { useFormik } from "formik";
import Head from "next/head";
// import { useDispatch } from "react-redux";
import router from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";

export default function SignUp(props) {
  const [isRoleClicked, setIsRoleClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmPassword: "",
      password: "",
      roleId: 1,
      fullName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
      fullName: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const userDataToPost = {
        email: values.email,
        password: values.password,
        roleId: checked ? 3 : 1,
        name: values.fullName,
      };
      console.log(userDataToPost);
      // authAPI
      //   .register(userDataToPost)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       router.push({
      //         pathname: "/sign-up/verify/[email]",
      //         query: { email: values.email },
      //       });
      //     }
      //   })
      //   .catch((error) => setIsSigned(true));
    },
  });

  return (
    <div className="flex justify-center ">
      <Head>
        <title>Sign Up | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="lg:w-1/2 xl:max-w-screen-sm ">
        <div className="mt-16 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-8 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Sign Up
          </h2>
          <div className="mt-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your email"
                  required
                />
                {formik.errors.email && formik.touched.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Full Name
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your Name"
                  required
                />
                {formik.errors.email && formik.touched.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your password"
                  required
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Confirm Password
                  </div>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Confirm password"
                  required
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <p className="text-blue-600 font-semibold">As manager</p>
              </div>

              {/* <EmployerCheckbox
                value={isRoleClicked}
                setValue={setIsRoleClicked}
              /> */}

              {isSigned && <p>Email has already signed up</p>}
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-md tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
                  type="submit"
                  // onClick={handleOpenOtp}
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Have an account ?{" "}
                <a
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  onClick={() => router.push("/login")}
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <form action="#" className="sign-in-form" onSubmit={formik.handleSubmit}>
  //     <h2 className="title">Sign in</h2>
  //     <div className="input-field">
  //       <AccountCircle />
  //       <input
  //         name="username"
  //         type="text"
  //         placeholder="Username"
  //         onChange={formik.handleChange}
  //         value={formik.values.username}
  //       />
  //     </div>
  //     <div className="input-field">
  //       <Lock />
  //       <input
  //         name="password"
  //         type="password"
  //         placeholder="Password"
  //         onChange={formik.handleChange}
  //         value={formik.values.password}
  //       />
  //     </div>
  //     {/* {loader} */}
  //     <Button color="primary" onClick={forgotPasswordInButtonClicked}>
  //       Forgot password?
  //     </Button>
  //     <input
  //       type="submit"
  //       defaultValue="Login"
  //       className="btn solid"
  //       // onClick={handleClickSB}
  //     />
  //     <p className="social-text">Or Sign in with social platforms</p>
  //     <div className="social-media">
  //       {/* onClick={signInWithGoogle} */}
  //       <a href="#" className="social-icon">
  //         <MailOutline />
  //       </a>
  //       {/* onClick={signInWithGithub} */}
  //       <a href="#" className="social-icon">
  //         {/* <img src="static/github-icon.svg" /> */}
  //         <Facebook />
  //       </a>
  //     </div>
  //     <Snackbar open={openSB} autoHideDuration={6000} onClose={handleCloseSB}>
  //       <Alert onClose={handleCloseSB} severity="error">
  //         Login fail! Please login again!
  //       </Alert>
  //     </Snackbar>
  //   </form>
  // );
}
