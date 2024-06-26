"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../utils/db";
import { z } from "zod";

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
/**
 * Update user info.
 *
 * @param prevState
 * @param payload
 * @returns
 */
export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  // ---------------------------------------------------------------------------
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );
  // ---------------------------------------------------------------------------
  // Validate payload
  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    // Return action state
    return { success: false, error: true };
  }
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  // ---------------------------------------------------------------------------
  // Update DB
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    // Return action state
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    // Return action state
    return { success: false, error: true };
  }
};

// =============================================================================
