import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Spinner from "./Spinner";

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
      <div className="hidden md:flex w-[50%] items-center justify-between">
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

        {/* Search */}
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl mx-4">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="" width={14} height={14} />
        </div>
      </div>
      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {/* Auth */}
        {/* Clerk Loading */}
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        {/* Clerk Loaded */}
        <ClerkLoaded>
          {/* Signed In */}
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="" width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          {/* Not Signed In */}
          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/user.png" alt="" width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        {/* Mobile Menu (Hamburger) */}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
