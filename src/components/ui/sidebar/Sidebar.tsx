"use client";

import Link from "next/link";
import clsx from "clsx";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { useUIStore } from "@/store";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface Props {
  session: Session | null;
}

export const Sidebar = ({ session }: Props) => {
  const isOpenSideMenu = useUIStore((state) => state.isOpenSideMenu);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div>
      {/* background black */}
      {isOpenSideMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10  bg-black  opacity-30" />
      )}

      {/* blur */}
      {isOpenSideMenu && (
        <div
          className="fede-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-filter  backdrop-blur-sm"
          onClick={closeSideMenu}
        />
      )}

      {/* sideMenu */}
      <nav
        className={clsx(
          "fixed h-screen overflow-auto p-5 right-0 top-0 w-[85%] md:w-[400px]  bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isOpenSideMenu, // !isOpenSideMenu === false
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Profile</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={() =>
              signOut({
                redirectTo: "/",
              })
            }
            className="flex items-center w-full mt-2 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Log out</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeSideMenu}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Log in</span>
          </Link>
        )}

        <div className="w-full h-px bg-gray-200 my-3" />

        {isAdmin && (
          <>
            <Link
              href="/admin/products"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
