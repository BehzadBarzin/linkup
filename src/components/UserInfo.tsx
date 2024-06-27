import React, { FC } from "react";
import Card from "./Card";

interface IProps {
  userId: string;
}

const UserInfo: FC<IProps> = ({ userId }) => {
  return <Card>UserInfo</Card>;
};

export default UserInfo;
