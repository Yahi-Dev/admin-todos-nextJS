"use client";

import Link from "next/link";
import { JSX } from "react";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export const SidebarItem = ({ path, icon, title, subtitle }: Props) => {
  const pathName = usePathname();
  const isActive = pathName === path;

  return (
    <Link
      href={path}
      className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl group ${
        isActive 
          ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={`-mr-1 font-medium ${isActive ? 'text-white' : 'group-hover:text-gray-700'}`}>
          {title}
        </span>
        <span className="text-sm text-white/50 hidden md:block">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};