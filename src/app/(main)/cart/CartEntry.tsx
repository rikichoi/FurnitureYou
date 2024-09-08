"use client";
import { CartItemWithProduct } from "@/lib/db/cart";
import formatPrice from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useTransition } from "react";

type CartEntryProps = {
  cartItems: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => void;
};

export default function CartEntry({
  cartItems: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions = new Array(99).fill(0).map((_, i) => i + 1);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={200}
          width={200}
          className="rounded-lg"
        />

      <div>
        <Link href={"/products/" + product.id} className="font-bold">
          {product.name}
        </Link>
        <div>Price: {formatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            defaultValue={quantity}
            className="select select-bordered w-full max-w-[80px]"
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity);
              });
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>Total: {formatPrice(product.price * quantity)}</div>
        {isPending && (
          <span className="loading loading-spinner loading-sm">Saving...</span>
        )}
      </div>
      </div>
      <div className="divider"/>
    </div>
  );
}
