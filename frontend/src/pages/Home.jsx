import React from "react";
import StarsBackground from "../components/StarsBackground";

import "../assets/styles/home.scss"

export const Home = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
      <StarsBackground />
      <div className="flex flex-col my-0 md:my-4 items-center">
        <div className="py-6 w-full md:w-3/4 text-center md:text-start">
          <h1 className="text-3xl md:text-5xl py-2">To the moon?</h1>
          <h1 className="text-3xl md:text-5xl py-2">Why limit yourself?</h1>
          <h1 className="text-3xl md:text-5xl py-2">Join the stars!</h1>
        </div>
        <div className="py-6 text-center md:text-start">
          <p className="text-xl md:text-2xl">Don't let anyone hold you back</p>
          <p className="text-xl md:text-2xl">
            Join our community today and reach for the stars!
          </p>
        </div>
      </div>
      <div className="flex flex-col my-4 justify-around items-center">
        <div className="w-full md:w-3/4">
          <button className="btn-home font-bold text-lg py-5 md:py-10 rounded-3xl w-full uppercase">
            Sign Up
          </button>
        </div>
        <div className="h-10"></div>
        <div className="w-full md:w-3/4">
          <button className="btn-home font-bold text-lg py-5 md:py-10 rounded-3xl w-full uppercase">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
