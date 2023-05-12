import React from "react";
import { StarryBackground } from "../components/StarsBackground";

import "../assets/styles/home.scss";
import Signup from "./Signup";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/web";

export const Home = () => {
  const [signUpClicked, setSignUpClicked] = React.useState(false);
  const [showComponent1, setShowComponent1] = React.useState(true);
  const canvasRef = React.useRef();

  const handleSignUpClick = () => {
    setSignUpClicked(true);
  };

  const handleBackClick = () => {
    setSignUpClicked(false);
  };

  const signUpComponentAnimation = useSpring({
    opacity: signUpClicked ? 1 : 0,
    transform: `translate(${signUpClicked ? "0px, 0px" : "-50px, 0px"})`,
    config: { tension: 100, friction: 20 },
  });

  const animation = useSpring({
    opacity: signUpClicked ? 0 : 1,
    from: { opacity: 0 },
  });

  return (
    <div className="flex flex-col my-0 md:my-4 items-center">
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000);
        }}
        ref={canvasRef}
      >
        <StarryBackground animate={signUpClicked} />
        <perspectiveCamera
          fov={45}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={1000}
          position={[0, 0, 5]}
        />
      </Canvas>
      <div className="w-full">
        {signUpClicked && (
          <animated.div style={signUpComponentAnimation}>
            <Signup handleBackClick={handleBackClick} />
          </animated.div>
        )}
        {!signUpClicked && (
          <animated.div style={animation} className="w-full">
            <div className="flex flex-col my-0 md:my-4 items-center">
              <div className="py-6 w-full text-center">
                <h1 className="text-3xl md:text-5xl py-2">To the moon?</h1>
                <h1 className="text-3xl md:text-5xl py-2">
                  Why limit yourself?
                </h1>
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
                <button
                  className="btn-home font-bold text-lg py-5 md:py-10 rounded-3xl w-full uppercase"
                  onClick={handleSignUpClick}
                >
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
          </animated.div>
        )}
      </div>
    </div>
  );
};
