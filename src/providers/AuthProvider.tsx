import { ClerkProvider } from "@clerk/nextjs";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "auto",
          logoImageUrl: "/logo.png",
          shimmer: true,
        },
        variables: {
          colorPrimary: "#008080", // Button Color
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
