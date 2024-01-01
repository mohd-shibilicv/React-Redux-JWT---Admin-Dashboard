import React from "react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 flex w-full font-semibold flex-col items-cente text-center text-black">
      <div className="w-full p-4 text-center text-gray-700 dark:text-gray-200">
        © 2023 Copyright &nbsp;
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="/"
        >
          Admin Dashboard
        </a>
      </div>
    </footer>
  );
}
