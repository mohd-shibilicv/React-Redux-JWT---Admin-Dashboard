import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
              The Freedom to Create the
              <span className="text-gray-900">Websites</span>
              You Want
            </h1>
            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
              A professonal website drives sales. Create a beautiful website to
              impress and engage new customers and establish your business
              online{" "}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Link to='/profile'>
              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 transition duration-150 ease-in-out hover:outline-2 hover:outline-gray-900 hover:outline-dotted hover:bg-gray-900 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-gray-800 py-2 sm:py-4 text-sm">
                Get Started
              </button>
            </Link>
            <Link to='/about'>
              <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-transparent transition duration-150 ease-in-out hover:outline-2 hover:outline-gray-800 hover:outline-dotted hover:border-gray-800 lg:text-xl lg:font-bold  hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-4 sm:px-10 py-2 sm:py-4 text-sm">
                About us
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
