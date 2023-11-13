import { TrashIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog"

export function DeleteUserDialog(prop: { id: string, action?: string }) {
  async function deleteUser() {
    const id = prop.id
    const url = prop.action === "role" ? `/api/users/roles/${id}` : `/api/users/${id}`
    const response = await fetch(url, {
      method: "DELETE",
    })
    const res = await response.json()
    if (res.error) {
      throw new Error(res.error)
    } else {
      window.location.reload()
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="mr-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-red-500">
          <TrashIcon className="h-5 w-5 cursor-pointer" />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Action Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete ID:{" "}
            <span className="text-blue-500">{prop.id}</span>?{" "}
            <div className="pt-2">This action cannot be undone.</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
