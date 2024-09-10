import Link from "next/link";
import React from "react";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9));

  const numberedPageItems = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link scroll={false} className={`${currentPage == page ? " pointer-events-none btn-active ": " "} btn join-item`} href={`?page=${page}`} key={page}>
        {page}
      </Link>,
    );
  }

  return <div className="join flex btn-primary">{numberedPageItems}</div>;
}
