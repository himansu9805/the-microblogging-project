import React from "react";
import Logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-8">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex flex-row items-center">
              <img src={Logo} alt="Logo" className="h-10 pr-5" />
              <div className="hidden md:block text-sm">
                The
                <br />
                Microblogging Project
              </div>
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow justify-center md:justify-end items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="flex md:flex-row mt-5 flex-col justify-end items-center">
              <Navitem value={"Home"} />
              <Navitem value={"About"} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

const Navitem = (props) => {
  return <div className="py-1 md:py-0 md:pl-10 cursor-pointer">{props.value}</div>;
};
