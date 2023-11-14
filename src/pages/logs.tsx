import React, { useContext } from "react"
import { has } from "cypress/types/lodash"

import { Layout } from "@/components/layout"
import LogTable from "@/components/table/log/log-table"

import { PermissionContext } from "../../context/permissions"

const Logs = () => {
  const role = useContext(PermissionContext)
  const logsPermission = role?.permissions?.find(
    (p) => p.database_name === "LOGS"
  )
  const hasLogsPermission =
    logsPermission?.read_all && logsPermission?.read_non_admin
  return (
    <Layout>
      <div className="p-14">
        <div className="pb-8">
          <div className="text-2xl font-medium">Logs</div>
        </div>

        {hasLogsPermission ? <LogTable /> : <div>Access Denied</div>}
      </div>
    </Layout>
  )
}

export default Logs
