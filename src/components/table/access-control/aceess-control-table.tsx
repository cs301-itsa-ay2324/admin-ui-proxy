import React from "react"
import UserRole from "@/../types/enums"
import { useQuery } from "react-query"

import { DataTable } from "../data-table"
import { Columns } from "./columns"

const AccessControlTable = () => {
  return <AccessControlData />
}

export default AccessControlTable

const AccessControlData = () => {
  const { isLoading, data } = useQuery("data", async () => {
    let userData = []
    const response = await fetch("/api/users")
    if (response.ok) {
      const data = await response.json()
      userData = data.users.map((user: any) => {
        return {
          id: user.id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
          points_balance: user.points_balance,
          role:
            user.role_id == null ? "-" : UserRole[user.role_id].toLowerCase(),
        }
      })
    }
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
