import React, { useContext } from "react"
import Link from "next/link"

import { Button } from "@/components/button"
import { Layout } from "@/components/layout"
import AccessControlTable from "@/components/table/access-control/aceess-control-table"

import { PermissionContext } from "../../../context/permissions"

const AccessControl = () => {
  const role = useContext(PermissionContext)
  const roleName = role?.name
  const accessControlPermission = roleName === "OWNER"
  return (
    <Layout>
      <div className="p-14">
        <div className="flex justify-between pb-8">
          <div className="text-2xl font-medium">Roles & Permissions</div>
          {accessControlPermission && (
            <Link href="/create-role">
              <Button>New Role</Button>
            </Link>
          )}
        </div>
        {accessControlPermission ? (
          <AccessControlTable />
        ) : (
          <div>Access Denied</div>
        )}
      </div>
    </Layout>
  )
}

export default AccessControl
