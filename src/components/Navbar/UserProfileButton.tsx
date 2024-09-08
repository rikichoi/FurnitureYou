"use client";
import { authOptions } from "@/lib/authOptions";
import { getServerSession, Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

type UserProfileButtonProps = {
  session: Session | null;
};

export default function UserProfileButton({ session }: UserProfileButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-circle btn-ghost"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="User Image"
            height={40}
            width={40}
            className=""
            src={
              session?.user?.image ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          {session ? (
            <button
              onClick={() => signOut()}
              className="btn btn-outline btn-warning"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="btn btn-outline btn-info"
            >
              Sign In
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
