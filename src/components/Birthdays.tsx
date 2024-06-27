import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

const Birthdays = () => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>
      {/* Birthdays */}
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
                <button className="bg-teal-500 text-white text-xs px-2 py-1 rounded-md hover:shadow-lg hover:bg-teal-700 transition-all">
                  Congratulate
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Upcoming */}
      <Link
        href={"/"}
        className="p-4 bg-slate-100 hover:bg-slate-200 transition-all rounded-lg flex items-center gap-4"
      >
        <Image src="/gift.png" alt="" width={24} height={24} />
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">See other 15 upcoming birthdays</span>
        </div>
      </Link>
    </Card>
  );
};

export default Birthdays;
