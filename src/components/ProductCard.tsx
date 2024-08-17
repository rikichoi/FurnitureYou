import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceTag from "./PriceTag";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 hover:shadow-xl transition-all"
    >
      <figure>
        <Image
          width={800}
          height={400}
          src={product.imageUrl}
          alt={product.name}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <span className="badge badge-accent ml-2">New</span>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
}
