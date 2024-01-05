import React from "react";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <div>
        <div class="container mx-auto flex flex-col items-center py-12 sm:py-24">
          <div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
              About
              <span class="text-gray-900">Us</span>
            </h1>
            <p class="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
              A professonal website drives sales. Create a beautiful website to
              impress and engage new customers and establish your business
              online{" "}
            </p>
            <p class="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
              A professonal website drives sales. Create a beautiful website to
              impress and engage new customers and establish your business
              online{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
