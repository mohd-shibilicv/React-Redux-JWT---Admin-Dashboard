import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
    const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("There was a problem in login with google, ", error);
    }
  };

  return (
    <>
      <div className="mt-3 flex justify-evenly">
        <p>__________________</p>
        <p className="p-3 rounded-full flex items-center justify-center border border-gray-800 w-10 h-10">
          OR
        </p>
        <p>__________________</p>
      </div>
      <a
        className="mb-3 flex gap-3 w-full bg-white text-black border border-gray-800 items-center justify-center rounded-lg px-7 pb-2.5 pt-3 mt-5 text-center text-sm font-medium uppercase leading-normal hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out"
        href="#!"
        onClick={handleGoogleClick}
        role="button"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <FaGoogle size={20} />
        Continue with Google
      </a>
    </>
  );
}
