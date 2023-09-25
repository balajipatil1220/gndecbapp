"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type StaffColumn = {
  id: string | null
  name: string | null
  email: string | null
  phonenumber: string | null
  gender: string | null
  role: string
  SatffId: string | undefined,
  createdAt: string;
}

export const columns: ColumnDef<StaffColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "phonenumber",
    header: "Phone number",
    enableSorting: false,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: false,
  },

  {
    accessorKey: "role",
    header: "Role",
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
