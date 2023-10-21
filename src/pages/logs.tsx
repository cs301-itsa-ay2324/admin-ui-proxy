import React from "react"

import { Layout } from "@/components/layout"
import LogTable from "@/components/table/log/log-table"

const logs = () => {
  return (
    <Layout>
      <div className="p-14">
        <div className="pb-8">
          <div className="text-2xl font-medium">Logs</div>
        </div>
        <LogTable />
      </div>
    </Layout>
  )
}

export default logs
