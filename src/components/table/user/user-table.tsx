import React, { useContext } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"

import { PermissionContext } from "../../../../context/permissions"
import { DataTable } from "../data-table"
import { Columns } from "./columns"

const UserTable = () => {
  return <UserData />
}

export default UserTable

async function populateRole() {
  const response = await fetch("/api/users/roles")
  const data = await response.json()
  const roleData = data.roles.map((role: any) => {
    return {
      id: role.id,
      name: role.name.toLowerCase(),
    }
  })
  return roleData
}

const UserData = () => {
  const { data: session } = useSession()
  const permissions = useContext(PermissionContext)
  const userPermission = permissions?.find((p) => p.database_name === "USER")
  const { data } = useQuery("data", async () => {
    let userData = []

    const response = await fetch("/api/users")

    if (response.ok) {
      const data = await response.json()
      const roleData = await populateRole()
      userData = data.users.map((user: any) => {
        const role: String =
          user.role_id == null
            ? "-"
            : roleData.find((role: any) => role.id == user.role_id).name
        return {
          id: user.id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
          points_balance: user.points_balance,
          role: role.toLowerCase(),
        }
      })
    }
    return userData
  })
  if (data) console.log(data)
  return (
    <div>
      {data && (
        <DataTable
          columns={Columns}
          data={
            !userPermission?.read_non_admin
              ? data
                  ?.filter((user: any) => user.role !== "-")
                  .filter((user: any) => user.email !== session?.user?.email)
              : data.filter((user: any) => user.email !== session?.user?.email)
          }
          subject="name"
        />
      )}
    </div>
  )
}
