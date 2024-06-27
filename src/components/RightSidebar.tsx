import React, { FC } from "react";
import FriendRequests from "./FriendRequests";
import Adverts from "./Adverts";
import Birthdays from "./Birthdays";

// If we're in the user profile, this userId would have value
interface IProps {
  userId?: string;
}

const RightSidebar: FC<IProps> = ({ userId }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Friend Requests */}
      <FriendRequests />
      {/* Birthdays */}
      <Birthdays />
      {/* Adverts */}
      <Adverts variant="medium" />
    </div>
  );
};

export default RightSidebar;
