import { FC } from "react";
import Image from "next/image";
import Feed from "@/components/feed/Feed";
import LeftSidebar from "@/components/left-bar/LeftSidebar";
import RightSidebar from "@/components/right-bar/RightSidebar";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = async ({ params }) => {
  // ---------------------------------------------------------------------------
  // Get user info and number of its followers, followings, and posts from DB
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();
  // ---------------------------------------------------------------------------
  // Don't show user if current profile's user has blocked the auth user
  const { userId: currentUserId } = auth();

  let isBlocked = false;
  if (currentUserId) {
    const result = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    isBlocked = !!result;
  }

  if (isBlocked) return notFound();
  // ---------------------------------------------------------------------------
  return (
    <main className="flex gap-6 pt-6">
      {/* Left */}
      <div className="hidden xl:block xl:w-[20%]">
        <LeftSidebar location="profile" />
      </div>
      {/* Center */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center">
            {/* Images */}
            <div className="w-full h-64 relative">
              {/* Cover */}
              <Image
                src={user.cover || "/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              {/* Avatar */}
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full ring-4 ring-teal-500 absolute z-10 left-0 right-0 m-auto -bottom-16"
              />
            </div>
            {/* User name */}
            <h1 className="mt-20 mb-4 text-2xl font-medium">{`${user.name} ${user.surname}`}</h1>
            {/* Stats */}
            <div className="flex items-center justify-center gap-12 mb-4">
              {/* Posts */}
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              {/* Followers */}
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              {/* Following */}
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>

          {/* Feed */}
          <Feed username={user.username} />
        </div>
      </div>
      {/* Right */}
      <div className="hidden lg:block lg:w-[30%]">
        <RightSidebar user={user} />
      </div>
    </main>
  );
};

export default Profile;
