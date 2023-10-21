import React from "react"

import { Layout } from "@/components/layout"
import { UsersForm } from "@/components/users-form"

const enrol = () => {
  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">Enrol User</div>
        <UsersForm />
      </div>
    </Layout>
  )
}

export default enrol
