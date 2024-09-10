import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

type HomeProps = {
  searchParams: {
    page: string;
  };
};

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const totalItemCount = await prisma.product.count();
  const pageSize = 6;
  const heroItemCount = 1;

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center gap-3">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={800}
              height={400}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                CHECK IT OUT
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationBar currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
