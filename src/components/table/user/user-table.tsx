import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

import { DataTable } from "../data-table"
import { Columns } from "./columns"
import UserRole from "@/../types/enums"

const UserTable = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <UserData />
    </QueryClientProvider>
  )
}

const UserData = () => {
  const { isLoading, data } = useQuery("data", async () => {
    const response = await fetch("/api/users")
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    const userData = data.map((user : any) => {
      return {
        id: user.id,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        points_balance: user.points_balance,
        role: UserRole[user.role_id].toLowerCase(),
      }
    })
    return userData
  })

  if (isLoading) {
    return <div>User Table Loading...</div>
  }

  return (
    <div>
      <DataTable columns={Columns} data={data} />
    </div>
  )
}

export default UserTable
