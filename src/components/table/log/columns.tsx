import { ColumnDef } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react"

export const Columns: ColumnDef<Logs>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>Log ID</div>
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
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "datetime",
    header: "Date",
  },
  {
    accessorKey: "device_info",
    header: "Device Info",
  },
  {
    id: "actions",
    header: "Actions",
    // Actions to be configured
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex justify-center">
          <SearchIcon
            onClick={() => navigator.clipboard.writeText(user.id)}
            className="h-5 w-5 cursor-pointer text-blue-500"
          />
        </div>
      )
    },
  },
]
