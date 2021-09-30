import router from "next/router";
import React from "react";

export default function LoginButton() {
  return (
    <div onClick={() => router.push("/login")}>
      <p className="navbar__item">Login</p>
    </div>
  );
}
