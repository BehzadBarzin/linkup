"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../utils/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
/**
 * Like/Unlike a post.
 *
 * @param postId target post
 */
export const switchLike = async (postId: number) => {
  // ---------------------------------------------------------------------------
  // Get the currently authenticated user
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");
  // ---------------------------------------------------------------------------
  // Update DB
  try {
    // Find the like if it exists in DB
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      // UNLIKE: If like exists in DB, remove it
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // LIKE: If like doesn't exist in DB, create it
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

// =============================================================================
/**
 * Add a comment on a post.
 *
 * @param postId target post
 * @param desc comment body
 * @returns
 */
export const addComment = async (postId: number, desc: string) => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");
  // ---------------------------------------------------------------------------
  // Update DB
  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

// =============================================================================
export const addPost = async (formData: FormData, img: string) => {
  // ---------------------------------------------------------------------------
  // Validate data
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");
  // ---------------------------------------------------------------------------
  // Create post in DB
  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};

// =============================================================================
/**
 * Add a new story.
 *
 * @param img story's image
 * @returns
 */
export const addStory = async (img: string) => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");
  // ---------------------------------------------------------------------------
  // Update DB (user can only have 1 story)
  try {
    // Find existing story for the user
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    // If story exists, remove it
    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    // Create a new story
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    // Return created story
    return createdStory;
  } catch (err) {
    console.log(err);
  }
};
// =============================================================================
/**
 * Delete a post.
 *
 * @param postId target post
 */
export const deletePost = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};

// =============================================================================
