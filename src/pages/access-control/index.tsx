import React from "react"
import Link from "next/link"

import { Button } from "@/components/button"
import { Layout } from "@/components/layout"
import AccessControlTable from "@/components/table/access-control/aceess-control-table"
const AccessControl = () => {
  return (
    <Layout>
      <div className="p-14">
        <div className="flex justify-between pb-8">
          <div className="text-2xl font-medium">Roles & Permissions</div>
          <Link href="/create-role">
            <Button>New Role</Button>
          </Link>
        </div>
        <AccessControlTable />
      </div>
    </Layout>
  )
}

export default AccessControl
