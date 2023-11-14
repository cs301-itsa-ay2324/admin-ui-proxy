import { ColumnDef } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

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
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "triggeredby",
    header: "Triggered By",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
]
