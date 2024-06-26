import Image from "next/image";
import React from "react";

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-scroll text-sm no-scrollbar">
      {/* Stories Container */}
      <div className="flex gap-8 w-max">
        {/* Single Story */}
        {Array(20)
          .join()
          .split(",")
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Image
                src="/sample-story.jpg"
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2"
              />
              <span className="font-medium ">John Doe</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
