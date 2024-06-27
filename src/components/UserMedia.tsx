import React, { FC } from "react";
import Card from "./Card";
import Link from "next/link";

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
    </Card>
  );
};

export default UserMedia;
