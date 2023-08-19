"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrdersColumn = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  }
]
