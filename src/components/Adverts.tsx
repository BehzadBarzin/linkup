import React, { FC } from "react";
import Card from "./Card";

interface IProps {
  variant: "large" | "medium" | "small";
}

const Adverts: FC<IProps> = ({ variant }) => {
  return <Card>Adverts</Card>;
};

export default Adverts;
