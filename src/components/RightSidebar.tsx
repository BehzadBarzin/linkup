import React, { FC } from "react";
import FriendRequests from "./FriendRequests";
import Adverts from "./Adverts";
import Birthdays from "./Birthdays";
import UserInfo from "./UserInfo";
import UserMedia from "./UserMedia";

// If we're in the user profile, this userId would have value
interface IProps {
  userId?: string;
}

const RightSidebar: FC<IProps> = ({ userId }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Only Display UserInfo and UserMedia if we're in the user profile */}
      {userId && (
        <>
          {/* UserInfo */}
          <UserInfo userId={userId} />
          {/* UserMedia */}
          <UserMedia userId={userId} />
        </>
      )}
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
