import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Connect with your friends on LinkUp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl-px-32 2xl-px-64">
            <Navbar />
          </div>
          <div className="bg-slate-100 px-4 md:px-8 lg:px-16 xl-px-32 2xl-px-64">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
