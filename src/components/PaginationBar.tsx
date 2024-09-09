import React from "react";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationBar({currentPage, totalPages}: PaginationBarProps) {
    const maxPage= Math.min(totalPages, Math.max(currentPage + 4, 10))
    return (
    <div className="btn-primary join mx-auto">
      <button className="btn join-item">1</button>
      <button className="btn join-item btn-active">2</button>
      <button className="btn join-item">3</button>
      <button className="btn join-item">4</button>
    </div>
  );
}
