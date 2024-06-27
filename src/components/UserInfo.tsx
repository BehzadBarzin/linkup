import React, { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

interface IProps {
  userId: string;
}

const UserInfo: FC<IProps> = ({ userId }) => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href={"/"} className="text-teal-700 text-xs hover:underline">
          See All
        </Link>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-4 text-gray-500">
        {/* User Name and Username */}
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">John Doe</span>
          <span className="text-sm text-teal-600">@johnny</span>
        </div>
        {/* Description */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          deserunt, minima in maxime reprehenderit atque sint ex labore commodi
          voluptatibus.
        </p>
        {/* User Details */}
        {/* City */}
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="" width={16} height={16} />
          <span className="text-xs">
            Living in <b>New York</b>
          </span>
        </div>
        {/* School */}
        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="" width={16} height={16} />
          <span className="text-xs">
            Went to <b>Harvard</b>
          </span>
        </div>
        {/* Work */}
        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="" width={16} height={16} />
          <span className="text-xs">
            Works at <b>LinkUp Inc.</b>
          </span>
        </div>
        {/* Details 2 (website + joined at) */}
        <div className="flex items-center justify-between">
          {/* Website */}
          <div className="flex gap-1 items-center ">
            <Image src="/link.png" alt="" width={16} height={16} />
            <Link
              href={"https://www.google.com/"}
              className="text-teal-500 font-medium"
            >
              google.com
            </Link>
          </div>
          {/* Joined At */}
          <div className="flex gap-1 items-center ">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>
              Joined at <b>{moment(new Date()).format("MMMM YYYY")}</b>
            </span>
          </div>
        </div>
        {/* Actions */}
        <button className="bg-teal-500 hover:bg-teal-800 transition-all text-white p-2 text-sm rounded-lg">
          Follow
        </button>
        <span className="text-red-500 self-end text-xs cursor-pointer">
          Block User
        </span>
      </div>
    </Card>
  );
};

export default UserInfo;
