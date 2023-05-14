import React from "react";
import dayjs from "dayjs";

import axiosConfig from "../config/axiosConfig";
import { Error, Success } from "../components/Toasts";
import { animated, useSpring } from "@react-spring/web";

export default function Signup({ handleBackClick, handleLoginClick }) {
  const startDate = new Date().setFullYear(new Date().getFullYear() - 18);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState({
    startDate: null,
  });

  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const animation = useSpring({
    to: { opacity: show ? 1 : 0 },
    config: { duration: 200 },
    reset: !show,
  });

  const validateForm = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      username === "" ||
      dateOfBirth.startDate === null
    ) {
      alert("Please fill all the fields");
      return false;
    } else {
      axiosConfig
        .post("/user/register/", {
          name: name,
          email: email,
          password: password,
          username: username,
          date_of_birth: dateOfBirth.startDate,
        })
        .then((res) => {
          setError("");
          setShow(true);
          setSuccess("User registered successfully");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(name + email + password + username + dateOfBirth.startDate);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setSuccess("");
      setError("");
    }, 10000);
  }, [show]);

  return (
    <div className="relative p-6 flex-auto w-full">
      <div className="text-center pb-3">
        <h2 className="text-5xl">Sign Up</h2>
      </div>
      <div className="fixed left-0 bottom-0 w-full">
        {success.length > 0 && (
          <animated.div
            style={animation}
            className="w-full flex flex-col items-center justify-center"
          >
            <Success
              message={success}
              setSuccess={setSuccess}
              setShow={setShow}
            />
          </animated.div>
        )}
        {error.length > 0 && (
          <animated.div
            style={animation}
            className="w-full flex flex-col items-center justify-center"
          >
            <Error message={error} setError={setError} setShow={setShow} />
          </animated.div>
        )}
      </div>
      <form className="flex flex-col justify-center items-center my-4 gap-4 w-full">
        <input
          type="text"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="email"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800  placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60 w-full max-w-lg"
          placeholder="Enter your date of birth"
          onFocus={(e) => (e.target.type = "date")}
          max={dayjs(startDate).format("YYYY-MM-DD")}
          onChange={(e) => setDateOfBirth({ startDate: e.target.value })}
          autoComplete="off"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <button
            className=" p-3 px-10 rounded-md uppercase w-full max-w-lg"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <button
            className="btn-danger p-3 px-10 rounded-md uppercase w-full max-w-lg"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
        <div className="text-center w-full max-w-lg">
          Already have an account?{" "}
          <span
            role="link"
            tabIndex={0}
            className="cursor-pointer"
            onClick={handleLoginClick}
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
}
