import React from "react"

import { Layout } from "@/components/layout"
import {RolesForm} from "@/components/roles-form"

const CreateRole = () => {
  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">Create New Role</div>
        <RolesForm />
      </div>
    </Layout>
  )
}

export default CreateRole