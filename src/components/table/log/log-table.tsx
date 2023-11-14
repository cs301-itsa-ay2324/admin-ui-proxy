import React from "react"
import { useQuery } from "react-query"

import { DataTable } from "../data-table"
import { Columns } from "./columns"

const LogTable = () => {
  return <LogData />
}

export default LogTable

const LogData = () => {
  const { isLoading, data } = useQuery("data", async () => {
    const response = await fetch("/api/logs")
    if (response.ok) {
      const data = await response.json()
      if (data.length > 1) {
        data.forEach((log: any) => {
          if (log.data) {
            log.data = JSON.parse(log.data)
          }
        })
      }
      return data
    }
    return []
  })
  if (isLoading) {
    return <div>Log Table Loading...</div>
  }

  return (
    <div>
      <DataTable columns={Columns} data={data} subject="id" />
    </div>
  )
}
