import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="w-[20%]">
        <Link href={"/"} className="font-extrabold text-2xl text-teal-600">
          LinkUp
        </Link>
      </div>
      {/* Center */}
      <div className="hidden md:flex w-[50%]">
        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          {/* Home */}
          <Link
            href={"/"}
            className="flex gap-2 p-2 items-center justify-center rounded-md hover:bg-teal-600/50 transition-all"
          >
            <Image src="/home.png" alt="home" width={16} height={16} />
            <span>Home</span>
          </Link>
          {/* Friends */}
          <Link
            href={"/"}
            className="flex gap-2 p-2 items-center justify-center rounded-md hover:bg-teal-600/50 transition-all"
          >
            <Image src="/friends.png" alt="home" width={16} height={16} />
            <span>Friends</span>
          </Link>
          {/* Stories */}
          <Link
            href={"/"}
            className="flex gap-2 p-2 items-center justify-center rounded-md hover:bg-teal-600/50 transition-all"
          >
            <Image src="/stories.png" alt="home" width={16} height={16} />
            <span>Stories</span>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {/* Mobile Menu (Hamburger) */}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
