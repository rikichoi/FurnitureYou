import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import React from "react";

type SearchPageProps = {
  searchParams: {
    query: string;
  };
};

export async function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: searchParams.query + " - FurnitureYou",
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: { id: "desc" },
  });
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
