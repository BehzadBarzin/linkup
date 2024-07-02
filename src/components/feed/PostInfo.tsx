"use client";

import { deletePost } from "@/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  // ---------------------------------------------------------------------------
  // Is the menu open or not
  const [open, setOpen] = useState(false);
  // ---------------------------------------------------------------------------
  // Create a bound function from the server action.
  // Give the bound function the postId argument
  // Now, where deletePostWithId is called, the postId arg is passed automatically
  const deletePostWithId = deletePost.bind(null, postId);
  // ---------------------------------------------------------------------------
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {/* If menu is open */}
      {open && (
        <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          {/* Form calls the bound server action */}
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
