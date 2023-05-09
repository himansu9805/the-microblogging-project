import React from "react";
import dayjs from "dayjs";

export default function Signup() {
  const startDate = new Date().setFullYear(new Date().getFullYear() - 18);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState({
    startDate: null,
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
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(name + email + password + username + dateOfBirth.startDate);
    }
  };

  return (
    <div className="mb-5 w-3/4">
          <div className="text-center pb-3">
            <h1 className="text-5xl">Sign Up</h1>
          </div>
          <form className="flex flex-col my-4 gap-4">
            <input
              type="text"
              className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              autocomplete="off"
            />
            <input
              type="email"
              className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              autocomplete="off"
            />
            <input
              type="password"
              className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800  placeholder-opacity-60"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="off"
            />
            <input
              type="text"
              className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              autocomplete="off"
            />
            <input
              type="text"
              className="border-2 border-zinc-900 p-3 rounded-md bg-zinc-800 placeholder-opacity-60"
              placeholder="Enter your date of birth"
              onFocus={(e) => (e.target.type = "date")}
              max={dayjs(startDate).format("YYYY-MM-DD")}
              onChange={(e) => setDateOfBirth({ startDate: e.target.value })}
              autocomplete="off"
            />
            <button
              className=" p-3 px-10 rounded-md uppercase"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
  );
}