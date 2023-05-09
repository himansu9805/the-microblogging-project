import React from "react";
import StarsBackground from "../components/StarsBackground";

import "../assets/styles/home.scss";

export const Home = () => {
  return (
    <div className="flex flex-col my-0 md:my-4 items-center">
        <StarsBackground />
        <div className="flex flex-col my-0 md:my-4 items-center">
          <div className="py-6 w-full text-center">
            <h1 className="text-3xl md:text-5xl py-2">To the moon?</h1>
            <h1 className="text-3xl md:text-5xl py-2">Why limit yourself?</h1>
            <h1 className="text-3xl md:text-5xl py-2">Join the stars!</h1>
          </div>
          <div className="py-6 text-center">
            <p className="text-xl md:text-2xl">
              Don't let anyone hold you back
            </p>
            <p className="text-xl md:text-2xl">
              Join our community today and reach for the stars!
            </p>
          </div>
      </div>
      <div className="py-6 w-full flex flex-col md:flex-row my-4 justify-center items-center">
          <div className="w-full md:w-1/4">
            <button className="btn-home font-bold text-lg py-5 md:py-10 rounded-3xl w-full uppercase">
              Sign Up
            </button>
          </div>
          <div className="h-10 md:w-64"></div>
          <div className="w-full md:w-1/4">
            <button className="btn-home font-bold text-lg py-5 md:py-10 rounded-3xl w-full uppercase">
              Login
            </button>
          </div>
        </div>
    </div>
  );
};
