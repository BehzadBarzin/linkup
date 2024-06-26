import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="">
        <Link href={"/"} className="font-extrabold text-2xl text-teal-600">
          LinkUp
        </Link>
      </div>
      {/* Center */}
      <div className="hidden"></div>
      {/* Right */}
      <div className="">
        {/* Mobile Menu (Hamburger) */}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
