import useOutsideAlerter from "app/hooks/useOutsideClicked";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import LoginButton from "../atoms/Button/LoginButton";
import SignUpButton from "../atoms/Button/SignUpButton";
import Divider from "../atoms/Divider";
import { Menu, Popover } from "@headlessui/react";
import DropdownAvatar from "../molecules/DropdownAvatar";
import { BellIcon, PlusIcon } from "@heroicons/react/solid";
import NotiSection from "../molecules/NotiSection";

function NavbarItem({ content, path }: any) {
  return (
    <Link href={path} passHref>
      <p
        className={
          (router.pathname === path && "text-blue-600") + " navbar__item"
        }
      >
        {content}
      </p>
    </Link>
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

const ButtonGroup = ({ roleId }) => {
  const listNavRole1 = [
    {
      content: "Find Jobs",
      path: "/job",
    },
    {
      content: "Company",
      path: "/company",
    },
    {
      content: "CV",
      path: "/list-cv",
    },
    {
      content: "Blog",
      path: "/blog",
    },
  ];

  const listNavRole2 = [
    {
      content: "Employee",
      path: "/employee",
    },
    {
      content: "Recruiter",
      path: "/recruiter",
    },
    {
      content: "Company",
      path: "/recruiter/company",
    },
  ];

  if (roleId === 1 || roleId === undefined)
    return (
      <div className="navbar__navigation">
        {listNavRole1.map((item, index) => (
          <NavbarItem key={index} content={item.content} path={item.path} />
        ))}
      </div>
    );
  if (roleId === 2)
    return (
      <div className="navbar__navigation">
        {listNavRole2.map((item, index) => (
          <NavbarItem key={index} content={item.content} path={item.path} />
        ))}
      </div>
    );

  return <div></div>;
};

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

      <ButtonGroup roleId={user.user?.roleId || undefined} />

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
          <div className="flex gap-4 justify-center items-center">
            <PlusIcon
              className="h-6 w-6 rounded-full cursor-pointer"
              onClick={(_) => router.push("/blog/post")}
            />
            <NotiSection />
            <DropdownAvatar />
          </div>
        )}
      </div>
    </div>
  );
}
