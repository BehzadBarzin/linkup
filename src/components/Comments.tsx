import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div>
      {/* Add Comment */}
      <div className="flex items-center gap-4">
        {/* User's Avatar */}
        <Image
          src="/sample-avatar.jpg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        {/* Input + Emoji */}
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="">
        {/* Single Comment */}
        {Array(2)
          .join()
          .split(",")
          .map((_, i) => (
            <div className="flex gap-4 justify-between mt-6" key={i}>
              {/* Avatar */}
              <Image
                src="/sample-avatar.jpg"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                {/* User Name */}
                <span className="font-medium">John Doe</span>
                {/* Comment Text */}
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Explicabo quidem totam deleniti enim modi odit distinctio, sed
                  quae maxime. Illum.
                </p>
                {/* Like + Reply */}
                <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                  {/* Like */}
                  <div className="flex items-center gap-4">
                    <Image
                      src="/like.png"
                      alt=""
                      width={12}
                      height={12}
                      className="cursor-pointer w-3 h-3"
                    />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">12 Likes</span>
                  </div>

                  {/* Reply */}
                  <div className=""></div>
                </div>
              </div>
              {/* More Icon */}
              <Image
                src="/more.png"
                alt=""
                width={16}
                height={16}
                className="cursor-pointer w-4 h-4"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
