import Image from "next/image";
import React from "react";
import Card from "./Card";

const AddPost = () => {
  return (
    <Card className="flex gap-4 justify-between">
      {/* Avatar */}
      <Image
        src="/sample-avatar.jpg"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* Input */}
      <div className="flex-1">
        {/* Text Input */}
        <div className="flex gap-4">
          {/* Input */}
          <textarea
            className="bg-slate-100 rounded-lg p-2 flex-1"
            placeholder="What's on your mind?"
          ></textarea>
          {/* Emoji */}
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
        </div>
        {/* Post Options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          {/* Add Image */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addImage.png" alt="" width={20} height={20} />
            Photo
          </div>
          {/* Add Video */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          {/* Add Event */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addEvent.png" alt="" width={20} height={20} />
            Event
          </div>
          {/* Poll */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddPost;
