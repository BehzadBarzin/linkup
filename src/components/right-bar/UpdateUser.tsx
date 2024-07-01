"use client";

import { User } from "@prisma/client";
import { FC } from "react";

interface IProps {
  user: User;
}

const UpdateUser: FC<IProps> = ({ user }) => {
  return <div className="">Update</div>;
};

export default UpdateUser;
