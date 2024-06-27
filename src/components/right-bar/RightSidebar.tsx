import React, { FC, Suspense } from "react";
import FriendRequests from "./FriendRequests";
import Adverts from "../Adverts";
import Birthdays from "./Birthdays";
import UserInfo from "./UserInfo";
import UserMedia from "./UserMedia";
import { User } from "@prisma/client";
import Spinner from "../Spinner";

// If we're in the user profile, this userId would have value
interface IProps {
  user?: User;
}

const RightSidebar: FC<IProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Only Display UserInfo and UserMedia if we're in the user profile */}
      {user && (
        <>
          {/* UserInfo */}
          <Suspense fallback={<Spinner />}>
            <UserInfo user={user} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            {/* UserMedia */}
            <UserMedia user={user} />{" "}
          </Suspense>
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
