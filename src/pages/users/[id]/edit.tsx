import React from "react"
import { useRouter } from "next/router"

import { Layout } from "@/components/layout"
import { UsersForm } from "@/components/users-form"

const EditPage = () => {
  const router = useRouter()
  const { id, name = "", email, role } = router.query
  const fullname = name.toString().split(" ")
  const firstName = fullname[0]
  const lastName = fullname[1]

  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">
          Edit User Details
        </div>
        <UsersForm
          defaultValues={{
            firstName: firstName,
            lastName: lastName,
            email: email as string,
            role: role as string,
          }}
        />
      </div>
    </Layout>
  )
}

export default EditPage
