import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import formatPrice from "@/lib/format";

export const metadata = {
  title: "Your Cart - FurnitureYou",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry
          cartItems={item}
          key={item.id}
          setProductQuantity={setProductQuantity}
        />
        
      ))}
      {!cart?.items.length && (
        <p className="text-center">Your cart is empty.</p>
      )}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">CHECKOUT</button>
      </div>
    </div>
  );
}
