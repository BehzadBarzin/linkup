import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-96px)] w-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-700">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-red-600 md:text-4xl">
            Something is missing.
          </p>
          <p className="mb-4 text-lg font-light text-red-500">
            Sorry, we cannot find this page.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-teal-500 hover:bg-teal-800 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 transition-all"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default notFound;
