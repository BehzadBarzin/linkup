import { cn } from "@/utils/cn";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<IProps> = ({ children, className }) => {
  return (
    <div className={cn("p-4 bg-white rounded-lg shadow-md text-sm", className)}>
      {children}
    </div>
  );
};

export default Card;
