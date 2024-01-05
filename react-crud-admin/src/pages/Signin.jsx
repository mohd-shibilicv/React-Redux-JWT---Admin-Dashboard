import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        setErrorMessage(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <>
      <h1 className="flex justify-center text-3xl mt-10 font-bold">Sign In</h1>
      <div className="flex justify-center mt-5">
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            {errorMessage && (
              <div
                className="mt-2 rounded-lg bg-red-100 py-4 px-6 text-base text-red-700"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
              required
              shadow
            />
          </div>
          {/* <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link to="/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div> */}
          <button
            className="border py-2 rounded-lg border-gray-500 hover:bg-gray-800 bg-white transition ease-in-out text-gray-900 hover:text-white hover:border-gray-800 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <span className="font-semibold">Sign In</span>
            )}
          </button>
          <OAuth />
        </form>
      </div>
      <div className="flex justify-center p-3">
        <p className="text-sm">Don't have an account?&nbsp;&nbsp;</p>
        <Link to="/signup" className="text-sm hover:underline text-indigo-900">
          Sign Up
        </Link>
      </div>
    </>
  );
}
