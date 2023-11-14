import React from "react"
import { useRouter } from "next/router"

import { Layout } from "@/components/layout"
import { RolesForm } from "@/components/roles-form"

const RoleEditPage = () => {
  const router = useRouter()
  const { id, role, users_service, points_service, logs_service } = router.query
  function formatQuery(service: string | string[] | undefined): CRUD[] {
    if (service === undefined) return []
    if (!Array.isArray(service)) {
      const item: CRUD = service as CRUD
      return [item]
    } else {
      return service as CRUD[]
    }
  }
  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">
          Edit Role Details
        </div>
        <RolesForm
          id={id as string}
          defaultValues={{
            role: role as string,
            users_service: formatQuery(users_service),
            points_service: formatQuery(points_service),
            logs_service: formatQuery(logs_service),
          }}
          status="update"
        />
      </div>
    </Layout>
  )
}

export default RoleEditPage
