"use client";
import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
  // ---------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // ---------------------------------------------------------------------------
  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((p) => !p)}
      >
        <div
          className={`w-6 h-1 bg-teal-600 rounded-sm transition-all ${
            isOpen && " origin-left rotate-45"
          }`}
        />
        <div
          className={`w-6 h-1 bg-teal-600 rounded-sm transition-all ${
            isOpen && " opacity-0"
          }`}
        />
        <div
          className={`w-6 h-1 bg-teal-600 rounded-sm transition-all ${
            isOpen && " origin-left -rotate-45"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-20">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Friends</Link>
          <Link href={"/"}>Groups</Link>
          <Link href={"/"}>Stories</Link>
          <Link href={"/"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
