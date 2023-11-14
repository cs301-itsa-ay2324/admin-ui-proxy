import React, { useContext, useEffect } from "react"
import UserRole from "@/../types/enums"
import { useQuery } from "react-query"

import { PermissionContext } from "../../../../context/permissions"
import { DataTable } from "../data-table"
import { Columns } from "./columns"

const UserTable = () => {
  return <UserData />
}

export default UserTable

const UserData = () => {
  const [users, setUsers] = React.useState([])
  const permissions = useContext(PermissionContext)
  const userPermission = permissions?.find((p) => p.database_name === "USER")
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

  return (
    <div>
      {data && (
        <DataTable
          columns={Columns}
          data={
            !userPermission?.read_non_admin
              ? data?.filter((user: any) => user.role !== "-")
              : data
          }
          subject="name"
        />
      )}
    </div>
  )
}
