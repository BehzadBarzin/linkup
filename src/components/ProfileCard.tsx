import React, { FC } from "react";
import Card from "./Card";
import Image from "next/image";

const ProfileCard = () => {
  return (
    <Card className="flex flex-col gap-6">
      {/* User Images */}
      <div className="h-20 relative">
        {/* Cover Image */}
        <Image
          src="/sample-post.jpg"
          alt=""
          fill
          className="rounded-lg object-cover"
        />
        {/* Avatar */}
        <Image
          src="/sample-avatar.jpg"
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-teal-500 z-10"
        />
      </div>
      {/* Info */}
      <div className="my-4 h-24 flex flex-col gap-2 items-center">
        {/* User name */}
        <span className="font-semibold">John Doe</span>
        {/* Followers */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex gap-1">
            {Array(3)
              .join()
              .split(",")
              .map((_, i) => (
                <Image
                  key={i}
                  src="/sample-avatar.jpg"
                  alt=""
                  width={16}
                  height={16}
                  className="rounded-full w-4 h-4 object-cover"
                />
              ))}
          </div>
          {/* Count */}
          <span className="text-xs text-gray-500">843&nbsp;Followers</span>
        </div>
        {/* Button */}
        <button className="bg-teal-500 hover:bg-teal-800 transition-all text-white p-2 text-sm rounded-lg">
          My Profile
        </button>
      </div>
    </Card>
  );
};

export default ProfileCard;
