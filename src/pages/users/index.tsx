import React, { useContext } from "react"
import Link from "next/link"

import { Button } from "@/components/button"
import { Layout } from "@/components/layout"
import UserTable from "@/components/table/user/user-table"

import { PermissionContext } from "../../../context/permissions"

const Users = () => {
  const permissions = useContext(PermissionContext)
  console.log(permissions)
  const userPermission = permissions?.find((p) => p.database_name === "USER")
  console.log(userPermission)
  return (
    <Layout>
      <div className="p-14">
        <div className="flex justify-between pb-8">
          <div className="text-2xl font-medium">User</div>
          {userPermission?.create && (
            <Link href="/enrol">
              <Button>New User</Button>
            </Link>
          )}
        </div>
        <UserTable />
      </div>
    </Layout>
  )
}

export default Users
