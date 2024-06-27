import React, { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  userId: string;
}

const UserMedia: FC<IProps> = ({ userId }) => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href={"/"} className="text-teal-700 text-xs hover:underline">
          See All
        </Link>
      </div>
      {/* Content */}
      <div className="flex gap-4 justify-between flex-wrap">
        {Array(8)
          .join()
          .split(",")
          .map((_, i) => (
            <div className="relative w-1/5 h-24" key={i}>
              <Image
                src="/sample-post.jpg"
                alt=""
                fill
                className="rounded-md object-cover"
              />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default UserMedia;
