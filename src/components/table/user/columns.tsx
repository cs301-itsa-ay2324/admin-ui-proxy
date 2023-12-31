import { useContext } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PenSquare,
  UserCog,
} from "lucide-react"

import { DeleteUserDialog } from "@/components/delete-user-dialog"

import { PermissionContext } from "../../../../context/permissions"

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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const role = useContext(PermissionContext)
      const userPermission = role?.permissions?.find(
        (p) => p.database_name === "USER"
      )
      const pointsPermission = role?.permissions?.find(
        (p) => p.database_name === "POINTS"
      )
      const canUpdatePoints = pointsPermission?.update

      return (
        <div className="flex gap-4">
          {userPermission?.update && (
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
          )}

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

            {canUpdatePoints ? (
              <>
                <PenSquare className="h-5 w-5 cursor-pointer" />
                Edit Points
              </>
            ) : (
              "View Points"
            )}

          </Link>
          {userPermission?.delete && (
            <DeleteUserDialog
              id={user.id}
              email={user.email}
              role={user.role}
            />
          )}
        </div>
      )
    },
  },
]
