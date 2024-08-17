import React from 'react'
import prisma from './prisma'
import { cookies } from 'next/headers'
import { Cart, Prisma } from '@prisma/client';

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } },
}>

export type ShoppingCart = CartWithProducts & { size: number, subtotal: number }

export async function getCart() {
    const localCartId = cookies().get("localCartId")?.value;
    const cart = localCartId ?
        await prisma.cart.findUnique({
            where: { id: localCartId },
            include: { items: { include: { product: true } } },
        }) : null;
    if (!cart) {
        return null;
    }
    return {
        ...cart,
        size: cart.items.reduce((total, item) => total + item.quantity, 0),
        subtotal: cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
    }
}

export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {}
    })
    // Note: For a production grade appendFile, needs better security such as encryption
    cookies().set("localCartId", newCart.id);

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    }
}
