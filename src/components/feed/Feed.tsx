import React, { FC } from "react";
import Post, { FeedPostType } from "./Post";
import Card from "../Card";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

// We use this username to display a specific user's feed on their profile page
interface IProps {
  username?: string;
}

const Feed: FC<IProps> = async ({ username }) => {
  // ---------------------------------------------------------------------------
  // Get the currently authenticated user
  const { userId } = auth();
  // ---------------------------------------------------------------------------
  // Get posts from DB
  let posts: FeedPostType[] = [];

  if (username) {
    // If we want a specific user's feed (to show on their profile page)
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        // Only select userId of likes
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (userId) {
    // If there's no username prop (we're in the home page)
    // We'll fetch all posts that belong to the authenticated user's friends

    // Get followings
    const following = await prisma.follower.findMany({
      // Only users that this (auth) user follows
      where: {
        followerId: userId,
      },
      // Only select the userId which this (auth) user follows
      select: {
        followingId: true,
      },
    });
    // Extract following user ids
    const followingIds = following.map((f) => f.followingId);

    // Now get the posts of all users that this (auth) user follows
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      include: {
        user: true,
        // Only select userId of likes
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  // ---------------------------------------------------------------------------
  return (
    <Card className="flex flex-col gap-12">
      {posts.length ? (
        posts.map((p) => <Post key={p.id} post={p} />)
      ) : (
        <p className="text-gray-500 italic">No Posts!</p>
      )}
    </Card>
  );
};

export default Feed;
