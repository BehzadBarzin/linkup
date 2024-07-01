"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../utils/db";

// =============================================================================
/**
 * Switch the following of the currently authenticated user to the target user.
 *
 * @param userId Target user
 */
export const switchFollow = async (userId: string) => {
  // Get currently authenticated user
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // Update following in DB

    // Get from DB
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      // If already follows, un-follow
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      // If Doesn't follow, then follow the target user

      // Get pending request
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        // If already requested, but hasn't accepted, delete the request
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        // If doesn't follow, and hasn't requested, make a follow request
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

// =============================================================================
/**
 * Switch the blocking of the currently authenticated user to the target user.
 *
 * @param userId Target user
 */
export const switchBlock = async (userId: string) => {
  // Get currently authenticated user
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    // Get the existing block from DB
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      // If already blocked, un-block the target user
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      // If hasn't blocked, then block the target user
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

// =============================================================================
/**
 * Accept target user's friend request.
 *
 * @param userId Target user (request sender)
 */
export const acceptFollowRequest = async (userId: string) => {
  // ---------------------------------------------------------------------------
  // Get authenticated user's id from Clerk
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }
  // ---------------------------------------------------------------------------
  // Update DB
  try {
    // Find follow request in DB
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    // If follow request is found
    if (existingFollowRequest) {
      // Delete the request
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      // Add target user (sender) to current user's followers
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

// =============================================================================
/**
 * Decline target user's friend request.
 *
 * @param userId Target user (request sender)
 */
export const declineFollowRequest = async (userId: string) => {
  // ---------------------------------------------------------------------------
  // Get authenticated user's id from Clerk
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }
  // ---------------------------------------------------------------------------
  // Update DB
  try {
    // Find follow request in DB
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    // If follow request is found
    if (existingFollowRequest) {
      // Delete the follow request
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};
// =============================================================================
