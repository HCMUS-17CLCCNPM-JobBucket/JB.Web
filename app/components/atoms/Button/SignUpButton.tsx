import router from "next/router";
import React from "react";

export default function SignUpButton() {
  return (
    <button
      type="button"
      className="btn primary-btn"
      onClick={() => router.push("/sign-up")}
    >
      Sign Up
    </button>
  );
}
