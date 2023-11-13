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
    const response = await fetch("/api/users/roles")

    function formatPermissionName(permissionType: string): string {
      return permissionType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    function getServicePermissions(
      permissions: Permissions[],
      databaseName: string
    ): string[] {
      const servicePermissions: string[] = []
      const relevantPermissions = permissions.find(
        (p) => p.database_name === databaseName
      )
      if (relevantPermissions) {
        Object.entries(relevantPermissions).forEach(([key, value]) => {
          if (value === true && ["read_all", "read_non_admin", "create", "update", "delete"].includes(key)) {
            servicePermissions.push(formatPermissionName(key));
          }
        });
      }
      return servicePermissions
    }

    if (response.ok) {
      const data = await response.json()
      const roleData: RolesPermissions[] = data.roles.map((role : Roles) => {
        return {
          id: role.id,
          name: role.name.toLowerCase(),
          users_service_permissions: getServicePermissions(
            role.permissions,
            "USER"
          ),
          points_service_permissions: getServicePermissions(
            role.permissions,
            "POINTS"
          ),
          logs_service_permissions: getServicePermissions(
            role.permissions,
            "LOGS"
          ),
        }
      })
      return roleData
    }
  })

  if (isLoading) {
    return <div>User Table Loading...</div>
  }

  return (
    <div>
      <DataTable columns={Columns} data={data || []} />
    </div>
  )
}
