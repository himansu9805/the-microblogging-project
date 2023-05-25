import React from "react";

import axiosConfig from "../config/axiosConfig";
import { Error, Success } from "../components/Toasts";
import { animated, useSpring } from "@react-spring/web";
import { UserContext } from "../context/UserContext";
import { UserContextType } from "../types/UserContext";

interface LoginProps {
  handleBackClick: () => void;
  handleSignUpClick: () => void;
}

export const Login: React.FC<LoginProps> = ({
  handleBackClick,
  handleSignUpClick,
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const userContext = React.useContext(UserContext) as UserContextType;
  const { setUser } = userContext;

  const animation = useSpring({
    to: { opacity: show ? 1 : 0 },
    config: { duration: 200 },
    reset: !show,
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill all the fields");
      return false;
    } else {
      var loginObject;
      if (username.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        loginObject = {
          email: username,
          password: password,
        };
      } else {
        loginObject = {
          username: username,
          password: password,
        };
      }
      axiosConfig
        .post("/user/login/", loginObject)
        .then((res) => {
          setError("");
          setShow(true);
          setSuccess("User loggedin successfully");
          setUser(res.data.user);
        })
        .catch((err) => {
          setSuccess("");
          setShow(true);
          setError(
            err.response.data[Object.keys(err.response.data)[0]]
              .toString()[0]
              .toUpperCase() +
              err.response.data[Object.keys(err.response.data)[0]]
                .toString()
                .slice(1)
          );
        });
    }
  };

  React.useEffect(() => {
    console.log("Login.jsx: useEffect: show: ", show);
    setTimeout(() => {
      setShow(false);
      setSuccess("");
      setError("");
    }, 10000);
  }, [show]);

  return (
    <div className="relative p-6 flex-auto w-full">
      <div className="text-center pb-3">
        <h2 className="text-5xl">Login</h2>
      </div>
      <div className="fixed left-0 bottom-0 w-full">
        {success.length > 0 && (
          <animated.div
            style={animation}
            className="w-full flex flex-col items-center justify-center"
          >
            <Success
              message={success}
              setMessage={setSuccess}
              setShow={setShow}
            />
          </animated.div>
        )}
        {error.length > 0 && (
          <animated.div
            style={animation}
            className="w-full flex flex-col items-center justify-center"
          >
            <Error message={error} setMessage={setError} setShow={setShow} />
          </animated.div>
        )}
      </div>
      <form
        className="flex flex-col justify-center items-center my-4 gap-4 w-full"
        onSubmit={submitForm}
      >
        <input
          type="text"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your username or email"
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800  placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <div className="text-right w-full max-w-lg">
          Don't remember your password?{" "}
          <a href="/forgot-password">Forgot Password</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <button className="p-3 px-10 rounded-md uppercase w-full max-w-lg">
            Login
          </button>
          <button
            className="btn-danger p-3 px-10 rounded-md uppercase w-full max-w-lg"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
        <div className="text-center w-full max-w-lg">
          Don't have an account?{" "}
          <span
            role="link"
            tabIndex={0}
            className="cursor-pointer"
            onClick={handleSignUpClick}
          >
            Sign up here
          </span>
        </div>
      </form>
    </div>
  );
};
