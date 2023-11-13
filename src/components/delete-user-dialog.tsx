import { TrashIcon } from "lucide-react"
import { toast } from "./use-toast"

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

export function DeleteUserDialog(prop: {
  id: string
  email: string
  role: string
  action?: string
}) {
  
  async function deleteUser() {
    console.log(prop)
    // deleting user from db
    const id = prop.id
    const url = prop.action === "role" ? `/api/users/roles/${id}` : `/api/users/${id}`
    const dbResponse = await fetch(url, {
      method: "DELETE",
    })
    await dbResponse.json()

    // deleting user from cognito
    if (prop.role !== "-") {
      const cognitoResponse = await fetch(`/api/users/cognito`, {
        method: "DELETE",
        body: JSON.stringify({ username: prop.email }),
      })
      await cognitoResponse.json()

      await Promise.all([dbResponse, cognitoResponse])
    }

    if (dbResponse.status !== 200) {
      toast({
        variant: "destructive",
        title: "Unsuccessful",
        description: "Something went wrong when removing user.",
        duration: 3000,
      })
    } else {
      toast({
        title: "Success",
        description: `User removed successfully.`,
        duration: 3000,
      })
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
