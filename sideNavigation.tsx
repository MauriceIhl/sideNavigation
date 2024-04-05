"use client";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link"; // use "react-router-dom" for react-router

interface SideNavigationProps {
  shadow?: string;
  h?: string;
  bgColor?: string;
  textColor?: string;
  bgBurger?: string;
  p?: string;
  maxWClosed?: string;
  wClosed?: string;
  wOpened?: string;
  gap?: string;
  bgHover?: string;
  burgerMenuMove?: boolean;
  linkList?: { label: string; link: string; icon: JSX.Element }[];
  endContent?: { label: string; link: string; icon: JSX.Element };
}

const SideNavigation = ({
  shadow = "shadow-xl",
  h = "h-[calc(100vh-65px)]",
  p = "p-4",
  textColor = "text-white",
  bgColor = "bg-black",
  bgBurger = "bg-white",
  wClosed = "w-20",
  wOpened = "w-80",
  gap = "gap-2",
  bgHover = "hover:bg-white/10",
  burgerMenuMove = true,
  linkList = [
    { label: "Home", link: "/", icon: <HomeIcon className="h-6 w-6 text-white" /> },
    { label: "Settings", link: "/", icon: <Cog6ToothIcon className="h-6 w-6 text-white" /> },
    { label: "Files", link: "/", icon: <FolderIcon className="h-6 w-6 text-white" /> },
    { label: "Messages", link: "/", icon: <EnvelopeIcon className="h-6 w-6 text-white" /> },
  ],
  endContent = { label: "Some User", link: "/", icon: <UserIcon className="h-6 w-6 text-black" /> },
}: SideNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        ${p} 
        ${isOpen ? wOpened : wClosed} 
        ${shadow} 
        ${bgColor} 
        ${h}
        transition-all duration-600 ease-out border-r border-white/15`}
    >
      <div
        className={`
          ${burgerMenuMove ? "justify-end" : "justify-start"} 
          w-full flex mt-4`}
      >
        <BurgerMenu onClick={onClick} isOpen={isOpen} burgerMenuColor={bgBurger} />
      </div>
      <div className="h-12" />
      <div className="flex flex-col justify-between h-[calc(100%-96px)]">
        <div
          className={`
          ${gap} 
          flex flex-col items-start justify-start`}
        >
          {linkList.map((linkObject) => {
            return (
              <Link
                href={linkObject.link}
                key={linkObject.label}
                className={`  
                ${bgHover} 
                ${isOpen && "gap-4"}
                w-full py-3 px-2 flex rounded-lg `}
              >
                <span className="px-1">{linkObject.icon}</span>
                <span
                  className={`
                  ${!isOpen && "opacity-0 translate-x-20 overflow-hidden"} 
                  ${isOpen && "transition-all duration-300 ease-out"}
                  ${textColor} 
                  text-md`}
                >
                  {isOpen && linkObject.label}
                </span>
              </Link>
            );
          })}
        </div>
        {endContent && (
          <Link
            href={endContent.link}
            key={endContent.label}
            className={` 
              ${bgHover}  
              w-full p-1 flex gap-4 rounded-lg h-12`}
          >
            <span
              className={`
                ${textColor} 
                ${bgBurger} 
                p-2 rounded-lg`}
            >
              {endContent.icon}
            </span>
            <span
              className={`
                  ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"} 
                  ${isOpen && "transition-all duration-500 ease-out"}
                  ${textColor} 
                  text-md flex items-center`}
            >
              {isOpen && endContent.label}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNavigation;

interface BurgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
  burgerMenuColor?: string;
}
const BurgerMenu = ({ onClick, isOpen, burgerMenuColor }: BurgerMenuProps) => {
  const btnStyle = "flex flex-col justify-center items-center p-2";
  const spanStyle = "block transition-all duration-400 ease-out h-0.5 w-8 rounded-full";

  return (
    <button onClick={onClick} className={btnStyle}>
      <span
        className={`
          ${burgerMenuColor} 
          ${spanStyle} 
          ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
      />
      <span
        className={`
          ${burgerMenuColor} 
          ${spanStyle} 
          ${isOpen ? "opacity-0 w-0" : "opacity-100"} my-0.5`}
      />
      <span
        className={`
          ${burgerMenuColor} 
          ${spanStyle} 
          ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
      />
    </button>
  );
};
