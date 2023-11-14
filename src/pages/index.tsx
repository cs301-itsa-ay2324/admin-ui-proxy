import { useContext } from "react"

import { PermissionContext } from "../../context/permissions"
import { Layout } from "../components/layout"

export default function Home() {
  const permissions = useContext(PermissionContext)
  console.log(permissions)
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl `}
      >
        Hello world
      </main>
    </Layout>
  )
}
