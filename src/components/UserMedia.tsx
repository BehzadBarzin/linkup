import React, { FC } from "react";
import Card from "./Card";

interface IProps {
  userId: string;
}

const UserMedia: FC<IProps> = ({ userId }) => {
  return <Card>UserMedia</Card>;
};

export default UserMedia;
