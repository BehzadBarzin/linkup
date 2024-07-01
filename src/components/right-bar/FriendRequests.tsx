import React from "react";
import Card from "../Card";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/db";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {
  // ---------------------------------------------------------------------------
  // Get Authenticated user's id from Clerk
  const { userId } = auth();
  if (!userId) return null;
  // ---------------------------------------------------------------------------
  // Fetch friend requests for this user from DB
  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  // if (!requests.length) return null;
  // ---------------------------------------------------------------------------
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href={"/"} className="text-teal-700 text-xs hover:underline">
          See All
        </Link>
      </div>
      {/* Requests */}
      <div className="flex flex-col gap-4">
        <FriendRequestList requests={requests} />
      </div>
    </Card>
  );
};

export default FriendRequests;
