"use client";

import { addComment } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { FC, useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

interface IProps {
  comments: CommentWithUser[];
  postId: number;
}

const CommentList: FC<IProps> = ({ comments, postId }) => {
  // ---------------------------------------------------------------------------
  // Get the current auth state and if a user is signed in, the user object.
  const { user } = useUser();
  // ---------------------------------------------------------------------------
  // Input value state
  const [desc, setDesc] = useState("");
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Actual comments state
  const [commentState, setCommentState] = useState<CommentWithUser[]>(comments);
  // ---------------------------------------------------------------------------
  // Optimistically updated comments state
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => {
      return [value, ...state];
    }
  );
  // ---------------------------------------------------------------------------
  // Add comment function
  const add = async () => {
    if (!user || !desc) return;

    // Optimistically update the state
    // Using temporary values for the optimistically added comment (it'll be replaced with real values from DB once action succeeds)
    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...", // Using this value as username to indicate sending state
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      // Call server action and update the actual comments state with the returned value
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* If user is logged in, show the add comment form */}
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </form>
        </div>
      )}
      <div className="">
        {/* Map over Comments List (optimistic state) */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* User Avatar */}
            <Image
              src={comment.user.avatar || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            {/* Comment Content */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            ></Image>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
