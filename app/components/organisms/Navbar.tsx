import useOutsideAlerter from "app/hooks/useOutsideClicked";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import LoginButton from "../atoms/Button/LoginButton";
import SignUpButton from "../atoms/Button/SignUpButton";
import Divider from "../atoms/Divider";

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
  return <img src="logo.png" alt="JobBucket" className="logo" />;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const wrapperRef = useRef(null);
  // const handleOutsideClicked = () => {
  //   setOpen(false);
  // };

  // useOutsideAlerter(wrapperRef, handleOutsideClicked);

  return (
    <div className="navbar">
      <Logo />
      <div className="navbar__navigation">
        <p className="navbar__item">Find Jobs</p>
        <p className="navbar__item">Company</p>
        <p className="navbar__item">CV Editor</p>
        <p className="navbar__item">Blog</p>
      </div>
      {/* <div className="navbar__auth">
        <LoginButton />
        <SignUpButton />
      </div> */}
      {/* ref={wrapperRef} */}
      <div>
        <div onClick={() => setOpen(!open)} className="avatar">
          <img
            src="https://picsum.photos/id/1005/200/200"
            className="avatar__img"
            alt="avatar"
          />
          <p className="avatar__name">Thang</p>
        </div>
        {open && <DropdownMenu />}
      </div>
    </div>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    console.log(height);
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <div>
        {props.section ? (
          <div
            className="menu__item "
            onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
          >
            <div>{props.children}</div>
            <p>{props.content}</p>
            <span>
              {props.more && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="icon-button__more"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>
        ) : (
          <a
            href="#"
            className="menu__item menu__item--hover"
            onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
          >
            <div>{props.children}</div>
            <p>{props.content}</p>
            <span>
              {props.more && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="icon-button__more"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div className="profile-btn">
            <img
              src="https://picsum.photos/id/1005/200/200"
              alt="avatar"
              className="profile-btn__img"
            />
            <div className="profile-btn__info">
              <p className="profile-btn__name">Thang</p>
              <p className="profile-btn__desc">View your profile</p>
            </div>
          </div>

          <Divider />

          <DropdownItem content="My Job">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </DropdownItem>
          <DropdownItem content="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.4 48.4">
              <g>
                <path
                  d="M48.4,24.2c0-1.8-1.297-3.719-2.896-4.285s-3.149-1.952-3.6-3.045c-0.451-1.093-0.334-3.173,0.396-4.705
		c0.729-1.532,0.287-3.807-0.986-5.08c-1.272-1.273-3.547-1.714-5.08-0.985c-1.532,0.729-3.609,0.848-4.699,0.397
		s-2.477-2.003-3.045-3.602C27.921,1.296,26,0,24.2,0c-1.8,0-3.721,1.296-4.29,2.895c-0.569,1.599-1.955,3.151-3.045,3.602
		c-1.09,0.451-3.168,0.332-4.7-0.397c-1.532-0.729-3.807-0.288-5.08,0.985c-1.273,1.273-1.714,3.547-0.985,5.08
		c0.729,1.533,0.845,3.611,0.392,4.703c-0.453,1.092-1.998,2.481-3.597,3.047S0,22.4,0,24.2s1.296,3.721,2.895,4.29
		c1.599,0.568,3.146,1.957,3.599,3.047c0.453,1.089,0.335,3.166-0.394,4.698s-0.288,3.807,0.985,5.08
		c1.273,1.272,3.547,1.714,5.08,0.985c1.533-0.729,3.61-0.847,4.7-0.395c1.091,0.452,2.476,2.008,3.045,3.604
		c0.569,1.596,2.49,2.891,4.29,2.891c1.8,0,3.721-1.295,4.29-2.891c0.568-1.596,1.953-3.15,3.043-3.604
		c1.09-0.453,3.17-0.334,4.701,0.396c1.533,0.729,3.808,0.287,5.08-0.985c1.273-1.273,1.715-3.548,0.986-5.08
		c-0.729-1.533-0.849-3.61-0.398-4.7c0.451-1.09,2.004-2.477,3.603-3.045C47.104,27.921,48.4,26,48.4,24.2z M24.2,33.08
		c-4.91,0-8.88-3.97-8.88-8.87c0-4.91,3.97-8.88,8.88-8.88c4.899,0,8.87,3.97,8.87,8.88C33.07,29.11,29.1,33.08,24.2,33.08z"
                />
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </DropdownItem>
          <Divider />
          <DropdownItem content="Report">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownItem>
          <DropdownItem content="Logout">
            <svg viewBox="0 0 512.00533 512" xmlns="http://www.w3.org/2000/svg">
              <path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438 9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969 42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0" />
              <path d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093 5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0" />
            </svg>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "darkmode"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p>Quick Settings</p>
          </div>
          <div className="dark-lang">
            <DropdownItem goToMenu="main" section={true} content="Dark Mode">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path>
              </svg>
            </DropdownItem>
            <div>
              <p>Off</p>
              <input
                id="r1"
                type="radio"
                name="radio"
                checked={true}
                defaultValue={1}
              />
            </div>
            <div>
              <p>On</p>
              <input id="r1" type="radio" name="radio" defaultValue={1} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

// export default App;
