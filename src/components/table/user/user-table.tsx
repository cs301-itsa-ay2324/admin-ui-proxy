import React from "react"
import { useQuery } from "react-query"

import { DataTable } from "../data-table"
import { Columns } from "./columns"

const UserTable = () => {
  return <UserData />
}

export default UserTable

async function populateRole(){
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
  const { isLoading, data } = useQuery("data", async () => {
    let userData : any = []
    const response = await fetch("/api/users")

    if (response.ok) {
      const data = await response.json()
      const roleData = await populateRole()
      userData = data.users.map((user: any) => {
        const role : String = user.role_id == null ? "-" : roleData.find((role: any) => role.id == user.role_id).name
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
  if (isLoading) {
    return <div>User Table Loading...</div>
  }

  return (
    <div>
      <DataTable columns={Columns} data={data} subject="name" />
    </div>
  )
}
