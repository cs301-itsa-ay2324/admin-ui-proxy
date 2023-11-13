import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCog,
} from "lucide-react"
import { DeleteUserDialog } from "@/components/delete-user-dialog"

export const Columns: ColumnDef<RolesPermissions>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>Role ID</div>
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
    header: "Role Name",
  },
  {
    accessorKey: "users_service_permissions",
    header: "Users Service",
  },
  {
    accessorKey: "points_service_permissions",
    header: "Points Service",
  },
  {
    accessorKey: "logs_service_permissions",
    header: "Logs Service",
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
      const role = row.original
      const id = role.id
      return (
        <div className="flex gap-4">
          <Link
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-primary"
            href={{
              pathname: `/access-control/${id}/edit`,
              query: {
                id,
                role: role.name,
                users_service: role.users_service_permissions,
                points_service: role.points_service_permissions,
                logs_service: role.logs_service_permissions,
              }
            }}
            as={`/access-control/${id}/edit`}
          >
            <UserCog className="h-5 w-5 cursor-pointer " />
            Edit
          </Link>
          <DeleteUserDialog id={id} />
        </div>
      )
    },
  },
]
