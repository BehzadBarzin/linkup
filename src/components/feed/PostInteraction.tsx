"use client";

import { switchLike } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { FC, useOptimistic, useState } from "react";

interface IProps {
  postId: number;
  likes: string[];
  commentCount: number;
}

const PostInteraction: FC<IProps> = ({ postId, likes, commentCount }) => {
  // ---------------------------------------------------------------------------
  // Returns the current auth state
  const { isLoaded, userId } = useAuth();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // State to keep the actual likes of this post
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });
  // ---------------------------------------------------------------------------
  // Optimistically updated state to keep the likes of this post
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState, // Actual state
    (state, value) => {
      // Return optimistically updated state
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const likeAction = async () => {
    // Optimistically update state
    switchOptimisticLike("");

    try {
      // Call server action to update db and like/unlike this post
      switchLike(postId);
      // Update the actual state of likes
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={16}
                height={16}
                alt=""
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/comment.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentCount}
            <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/share.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
