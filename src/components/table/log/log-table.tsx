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
      console.log(data)
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
