"use client";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButton = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButton) {
  const { pending } = useFormStatus();

  return (
    <button className={`btn btn-primary ${className}`} type="submit" disabled={pending}>
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
