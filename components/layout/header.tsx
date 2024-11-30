"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Drawer from "../ui/drawer";
import Link from "next/link";
interface HeaderProps {
  title?: string;
}

export default function Header({ title = "ChromoMood" }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full max-w-[600px] z-20 h-[48px] flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      <Link href="/">
        <h1 className="text-xl font-bold">{title}</h1>
      </Link>
      <button onClick={() => setIsDrawerOpen(true)}>
        <Bars3Icon className="w-6 h-6 text-black" />
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
