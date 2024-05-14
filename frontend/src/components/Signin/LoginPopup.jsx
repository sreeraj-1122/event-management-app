import React, { useContext, useState } from "react";
import { url } from './../../baseUrl/baseUrl';
import { StoreContext } from './../../context/StoreContext';
import { toast } from 'react-toastify';
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (e) => {
  e.preventDefault();
  let newUrl = url;

  if (currentState === "Login") {
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }

  try {
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    // Handle error from axios request
    toast.error("An error occurred while processing your request.");
    console.error("Error:", error);
  }
};

  return (
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid ">
      <form
        onSubmit={onLogin}
        className="place-self-center w-full	sm:w-1/3 text-[#808080] bg-white flex flex-col gap-6 px-6 py-5 rounded-lg	text-base fade-in"
      >
        <div className="flex items-center justify-between font-bold text-xl text-gray-700">
          <h2>{currentState}</h2>
          <div onClick={() => setShowLogin(false)} className="cursor-pointer">X</div>
        </div>
        <div className="flex flex-col gap-5 text-slate-800">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              className="outline-none border border-slate-500 p-2 rounded-md	 "
              type="text"
              placeholder="Your name"
              required
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          )}
          <input
            className="outline-none border border-slate-500 p-2 rounded-md	 "
            type="email"
            placeholder="Your email"
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            className="outline-none border border-slate-500 p-2 rounded-md	 "
            type="password"
            placeholder="Password"
            required
            name="password"
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[tomato] p-2 rounded-md font-semibold "
        >
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex  items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-2" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-[tomato] font-semibold cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-[tomato] font-semibold cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
