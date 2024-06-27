import React, { FC } from "react";
import Card from "../Card";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@/utils/db";

interface IProps {
  user: User;
}

const UserMedia: FC<IProps> = async ({ user }) => {
  // ---------------------------------------------------------------------------
  // Get the user's posts that have media
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  // ---------------------------------------------------------------------------
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href={"/"} className="text-teal-700 text-xs hover:underline">
          See All
        </Link>
      </div>
      {/* Content */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length ? (
          postsWithMedia.map((post, i) => (
            <div className="relative w-1/5 h-24" key={i}>
              <Image
                src={post.img!}
                alt=""
                fill
                className="rounded-md object-cover"
              />
            </div>
          ))
        ) : (
          <p className="italic text-center w-full text-gray-500">
            No Media Found
          </p>
        )}
      </div>
    </Card>
  );
};

export default UserMedia;
