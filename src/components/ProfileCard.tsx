import React, { FC } from "react";
import Card from "./Card";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

const ProfileCard = async () => {
  // ---------------------------------------------------------------------------
  // Get currently logged in user from Clerk
  const { userId } = auth();

  if (!userId) return null;
  // ---------------------------------------------------------------------------
  // Get user info and number of its followers from DB
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;
  // ---------------------------------------------------------------------------
  return (
    <Card className="flex flex-col gap-6">
      {/* User Images */}
      <div className="h-20 relative">
        {/* Cover Image */}
        <Image
          src={user.cover || "/noCover.png"}
          alt=""
          fill
          className="rounded-lg object-cover"
        />
        {/* Avatar */}
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-teal-500 z-10"
        />
      </div>
      {/* Info */}
      <div className="my-4 h-24 flex flex-col gap-2 items-center">
        {/* User name */}
        <span className="font-semibold">{`${user.name} ${user.surname}`}</span>
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
          <span className="text-xs text-gray-500">
            {user._count.followers}&nbsp;Followers
          </span>
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
