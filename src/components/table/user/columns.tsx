import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PenSquare,
  UserCog,
} from "lucide-react"

import { DeleteUserDialog } from "@/components/delete-user-dialog"

export const Columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>User ID</div>
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      )
    },
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
    accessorKey: "points_balance",
    header: "Points Balance",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="flex justify-center">
          <div>Actions</div>
        </div>
      )
    },
    // Actions to be configured
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex gap-4">
          <Link
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-primary"
            href={{
              pathname: `/users/${user.id}/edit`,
              query: { name: user.name, email: user.email, role: user.role },
            }}
            as={`/users/${user.id}/edit`}
          >
            <UserCog className="h-5 w-5 cursor-pointer " />
            Edit
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg border px-3 py-2"
            href={{
              pathname: `/users/${user.id}/points`,
              query: {
                name: user.name,
                balance: user.points_balance,
              },
            }}
            as={`/users/${user.id}/points`}
          >
            <PenSquare className="h-5 w-5 cursor-pointer " />
            Adjust Points
          </Link>
          <DeleteUserDialog id={user.id} />
        </div>
      )
    },
  },
]
