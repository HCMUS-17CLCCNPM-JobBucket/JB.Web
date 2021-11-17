// import UserAPI from "app/api/modules/userAPI";
import { authAPI } from "app/api/modules/authAPI";
import axios from "axios";
import { useFormik } from "formik";
import router from "next/router";
import React from "react";
// import * as Yup from "yup";

export function getServerSideProps({ params }) {
  return { props: { email: params.email } };
}
export default function VerifyPage(props) {
  const handleResend = async () => {
    const res = await authAPI.resend(props.email);
    if (res.status !== 200) {
      //error
    }
  };

  const formik = useFormik({
    initialValues: {
      email: props.email,
      code: "",
    },
    // validationSchema: Yup.object({
    //   code: Yup.number().required("Required!"),
    // }),
    onSubmit: async (values) => {
      const res = await authAPI.verifyEmail(values);
      if (res.status === 200) router.push("/login");
    },
  });
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-2/3 lg:w-1/3 p-8 items-center border-2 border-gray-200 rounded-md shadow-lg">
        <p className="text-2xl font-semibold">Enter Verification Code</p>
        <div className="">
          <p>A verification code has been seen to your mail</p>
          <p>Please enter it to verify your account</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>
              <input
                id="code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                type="text"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 border-gray-300 text-gray-900"
              />
              {formik.errors.code && formik.touched.code && (
                <p>{formik.errors.code}</p>
              )}
            </div>
            <p
              className="cursor-pointer hover:text-blue-600 ease-in-trans"
              onClick={handleResend}
            >
              Resend Code?
            </p>
          </div>
          <button
            type="submit"
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
