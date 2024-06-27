import React from "react";
import Image from "next/image";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Images */}
      <div className="w-full h-64 relative">
        {/* Cover */}
        <Image
          src="/sample-post.jpg"
          alt=""
          fill
          className="object-cover rounded-md"
        />
        {/* Avatar */}
        <Image
          src="/sample-avatar.jpg"
          alt=""
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded-full ring-4 ring-teal-500 absolute z-10 left-0 right-0 m-auto -bottom-16"
        />
      </div>
      {/* User name */}
      <h1 className="mt-20 mb-4 text-2xl font-medium">John Doe</h1>
      {/* Stats */}
      <div className="flex items-center justify-center gap-12 mb-4">
        {/* Posts */}
        <div className="flex flex-col items-center">
          <span className="font-medium">18</span>
          <span className="text-sm">Posts</span>
        </div>
        {/* Followers */}
        <div className="flex flex-col items-center">
          <span className="font-medium">872</span>
          <span className="text-sm">Followers</span>
        </div>
        {/* Following */}
        <div className="flex flex-col items-center">
          <span className="font-medium">1.2K</span>
          <span className="text-sm">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
