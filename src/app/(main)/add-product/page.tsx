import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { title } from "process";
import React from "react";

export const metadata = {
  title: "Add Product",
};

async function addProduct(formData: FormData) {
    "use server"

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageURL")?.toString();
    const price = Number(formData.get("price")||0);

    if (!name || !description || !imageUrl || !price){
        throw Error("All fields are required");
    }

    await prisma.product.create({
        data: {
            name,
            description,
            imageUrl,
            price,
        },
    });
    redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-3xl text-center">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="mb-3 w-full input input-bordered"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageURL"
          placeholder="Image URL"
          type="url"
          className="mb-3 w-full input input-bordered"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="mb-3 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block ">
          ADD PRODUCT
        </FormSubmitButton>
      </form>
    </div>
  );
}
