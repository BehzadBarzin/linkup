"use client";

import { switchBlock, switchFollow } from "@/actions";
import { FC, useOptimistic, useState } from "react";

interface IProps {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}

const UserInfoInteraction: FC<IProps> = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}) => {
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Setup optimistic updates to change follow and block states
  // We immediately update the UI but run the logic in the server action
  // If action fails, optimistic update would be reversed
  const [optimisticState, updateOptimisticState] = useOptimistic(
    // State that would update optimistically
    userState,
    // Optimistic State Update Function (takes current state and a value (usually new value), and returns the optimistically updated state)
    // In this code, the optimistic update function's value is just an action because we're not adding a new value to the state
    (state, value: "follow" | "block") => {
      if (value === "follow") {
        return {
          ...state,
          following: state.following && false,
          followingRequestSent:
            !state.following && !state.followingRequestSent ? true : false,
        };
      } else if (value === "block") {
        return { ...state, blocked: !state.blocked };
      } else {
        throw Error("Unsupported action");
      }
    }
  );
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const follow = async () => {
    // Optimistically update the UI state (userState)
    updateOptimisticState("follow");

    try {
      // Call Server Action
      await switchFollow(userId);
      // Update Local State
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) {
      console.log("Error when calling server action to follow/unfollow user.");
    }
  };
  // ---------------------------------------------------------------------------
  const block = async () => {
    // Optimistically update the UI state (userState)
    updateOptimisticState("block");

    try {
      // Call server action to block/unblock user
      await switchBlock(userId);
      // Update Local State
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Follow Form */}
      <form action={follow}>
        <button className="w-full bg-teal-500 hover:bg-teal-800 transition-all text-white p-2 text-sm rounded-lg">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      {/* Block Form */}
      <form action={block} className="self-end ">
        <button>
          <span className="text-red-500 self-end text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoInteraction;
