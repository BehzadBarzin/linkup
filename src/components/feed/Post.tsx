import Image from "next/image";
import Comments from "./Comments";
import { FC } from "react";
import { Post as PostType, User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export type FeedPostType = PostType & { user: User } & {
  likes: { userId: string }[];
} & {
  _count: { comments: number };
};

interface IProps {
  post: FeedPostType;
}

const Post: FC<IProps> = ({ post }) => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user's id
  const { userId } = auth();
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-4 ">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Image
            src={post.user.avatar || "/sample-avatar.jpg"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          {/* Username */}
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {/* More... */}
        <Image
          src="/more.png"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        {/* Post Image */}
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>
        )}
        {/* Post Text */}
        <p>{post.desc}</p>
      </div>
      {/* Interaction */}
      <div className="flex items-center justify-between text-sm my-4">
        {/* Left */}
        <div className="flex gap-8">
          {/* Likes */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/like.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              657 <span className="hidden md:inline">&nbsp;Likes</span>
            </span>
          </div>
          {/* Comments */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              178 <span className="hidden md:inline">&nbsp;Comments</span>
            </span>
          </div>
        </div>
        {/* Right */}
        <div className="">
          {/* Share */}
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              <span className="hidden md:inline">Share</span>
            </span>
          </div>
        </div>
      </div>

      {/* Comments */}
      <Comments />
    </div>
  );
};

export default Post;
