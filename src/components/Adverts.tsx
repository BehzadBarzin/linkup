import React, { FC } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  variant: "large" | "medium" | "small";
}

const Adverts: FC<IProps> = ({ variant }) => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium text-gray-500">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* Content */}
      <div
        className={`flex flex-col mt-4 ${
          variant === "small" ? "gap-2" : "gap-4"
        }`}
      >
        {/* Ad Image */}
        <div
          className={`relative w-full ${
            variant === "small"
              ? "h-24"
              : variant === "medium"
              ? "h-36"
              : "h-48"
          }`}
        >
          <Image
            src="/sample-advert.jpg"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* Ad Title */}
        <div className="flex items-center gap-4">
          <Image
            src="/sample-advert.jpg"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-teal-500 font-medium">Company XYZ</span>
        </div>
        {/* Ad Text */}
        <p className={variant === "small" ? "text-xs" : "text-sm"}>
          {variant === "small"
            ? "Lorem ipsum dolor sit amet."
            : variant === "medium"
            ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eligendi esse nemo natus minima, vel officiis ut molestias pariatur? Temporibus."}
        </p>
        {/* Ad Button */}
        <button className="bg-gray-200 hover:bg-gray-300 transition-all text-gray-500 p-2 text-sm rounded-lg">
          Learn More
        </button>
      </div>
    </Card>
  );
};

export default Adverts;
