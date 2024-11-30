import React from "react";
import Header from "./header";
import Shader from "../ui/shader-gradient";

export default function CustomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 z-0">
        <Shader />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[600px] h-screen bg-white shadow-md z-20">
        <Header />
        <div className="mt-[48px] mb-[66px]">{children}</div>
      </div>
    </div>
  );
}
