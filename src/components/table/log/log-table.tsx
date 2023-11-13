import React from "react"

import { Logs } from "../../../../config/logs"
import { DataTable } from "../data-table"
import { Columns } from "./columns"

const LogTable = () => {
  return (
    <div>
      <DataTable columns={Columns} data={Logs} subject="id" />
    </div>
  )
}

export default LogTable
