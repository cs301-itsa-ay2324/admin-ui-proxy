import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

import { DataTable } from "../data-table"
import { Columns } from "./columns"

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
    const userData = await response.json()
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
