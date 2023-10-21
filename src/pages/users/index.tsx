import React from "react"
import Link from "next/link"

import { Button } from "@/components/button"
import { Layout } from "@/components/layout"
import UserTable from "@/components/table/user/user-table"

const users = () => {
  return (
    <Layout>
      <div className="p-14">
        <div className="flex justify-between pb-8">
          <div className="text-2xl font-medium">User</div>
          <Link href="/enrol">
            <Button>New User</Button>
          </Link>
        </div>
        <UserTable />
      </div>
    </Layout>
  )
}

export default users
