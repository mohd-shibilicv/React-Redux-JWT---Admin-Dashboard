import React from "react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 flex w-full flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600">
      <div className="w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        © 2023 Copyright &nbsp;
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://tw-elements.com/"
        >
          Admin Dashboard
        </a>
      </div>
    </footer>
  );
}
