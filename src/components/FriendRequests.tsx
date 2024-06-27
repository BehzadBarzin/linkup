import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

const FriendRequests = () => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href={"/"} className="text-teal-700 text-xs hover:underline">
          See All
        </Link>
      </div>
      {/* Requests */}
      <div className="flex flex-col gap-4">
        {Array(3)
          .join()
          .split(",")
          .map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              {/* User */}
              <div className="flex items-center gap-4">
                <Image
                  src="/sample-avatar.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold ">John Doe</span>
              </div>
              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default FriendRequests;
