import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/app/assets/logo.png";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search/?query=" + searchQuery);
  }
}

export default async function Navbar() {
    const cart = await getCart();
  return (
    <div className="navbar bg-base-100 flex-col sm:flex-row">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <Image alt="Logo Image" src={Logo} height={40} width={40} />
          FurnitureYou
        </Link>
      </div>
      <div className="flex-none">
        <form action={searchProducts}>
          <div className="form-control">
            <input
              name="searchQuery"
              placeholder="Search"
              className="input input-bordered w-full min-w-[100px]"
            />
          </div>
        </form>
        <ShoppingCartButton cart={cart}/>

      </div>
    </div>
  );
}
