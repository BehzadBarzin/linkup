import React, { FC } from "react";
import ProfileCard from "./ProfileCard";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { leftSidebarLinks } from "@/constants";
import Adverts from "./Adverts";

// If we're in the user profile, won't show user profile card
interface IProps {
  location: "home" | "profile";
}

const LeftSidebar: FC<IProps> = ({ location }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Only Display ProfileCard if we're in the Home page */}
      {location === "home" && <ProfileCard />}
      {/* Links */}
      <Card className="text-gray-500 flex flex-col gap-2">
        {leftSidebarLinks.map((l, idx) => (
          <>
            <Link
              key={l.id}
              href={l.href}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-all"
            >
              <Image src={l.image} alt="" width={20} height={20} />
              <span>{l.title}</span>
            </Link>
            {/* Divider (only if it's not the last link) */}
            {idx !== leftSidebarLinks.length - 1 && (
              <hr className="border-t-1 border-gray-100 w-full self-center" />
            )}
          </>
        ))}
      </Card>

      {/* Advert */}
      <Adverts variant="small" />
    </div>
  );
};

export default LeftSidebar;
