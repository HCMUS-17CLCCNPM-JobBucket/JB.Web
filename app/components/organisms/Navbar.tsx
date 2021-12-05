import useOutsideAlerter from "app/hooks/useOutsideClicked";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import LoginButton from "../atoms/Button/LoginButton";
import SignUpButton from "../atoms/Button/SignUpButton";
import Divider from "../atoms/Divider";
import { Menu } from "@headlessui/react";
import DropdownAvatar from "../molecules/DropdownAvatar";
export function NavbarItem({ content, path }: any) {
  return (
    <li>
      <Link href={path} passHref>
        <p className="navbar-item dark:text-white">{content}</p>
      </Link>
    </li>
  );
}

export function Logo() {
  return (
    <img
      src="/logo.png"
      alt="JobBucket"
      className="logo"
      onClick={() => router.push("/")}
    />
  );
}

export default function Navbar() {
  const user = useSelector((state: any) => state.user);

  const [open, setOpen] = useState(false);
  // const wrapperRef = useRef(null);
  // const handleOutsideClicked = () => {
  //   setOpen(false);
  // };

  // useOutsideAlerter(wrapperRef, handleOutsideClicked);
  return (
    <div className="navbar sticky top-0 bg-white z-50">
      <Logo />
      <div className="navbar__navigation">
        <p className="navbar__item" onClick={() => router.push("/job")}>
          Find Jobs
        </p>
        <p className="navbar__item" onClick={() => router.push("/company")}>
          Company
        </p>
        <p className="navbar__item">CV Editor</p>
        <p className="navbar__item" onClick={() => router.push("/blog")}>
          Blog
        </p>
      </div>
      <div>
        {user.token == "" ? (
          <div className="flex gap-4 items-center">
            <button
              type="button"
              className="btn primary-btn"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 p-2 rounded-full border-2 border-gray-400 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => router.push("/blog/post")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <DropdownAvatar />
          </div>
        )}
      </div>
    </div>
  );
}
