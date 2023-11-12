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

export function DeleteUserDialog(prop: { id: string }) {
  async function deleteUser() {
    console.log(prop.id)
    const id = prop.id
    const response = await fetch(`/api/users/${id}`, {
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
            Are you sure you want to delete the user with ID:{" "}
            <span className="text-blue-500">{prop.id}</span>? This action cannot
            be undone.
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