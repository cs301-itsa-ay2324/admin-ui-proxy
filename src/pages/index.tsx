import { useContext } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import { PermissionContext } from "../../context/permissions"
import { Layout } from "../components/layout"

export default function Home() {
  const { data: session, status } = useSession()
  const permissions = useContext(PermissionContext)
  console.log(permissions)
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-10 pt-36 text-2xl `}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={`ascenda-logo.svg`}
            width={200}
            height={200}
            alt="ascenda logo"
          />
          <h2 className=" font-medium text-primary">Admin Portal</h2>
          <p className="text-center">
            {session
              ? `Welcome, ${session?.user?.email}`
              : "Please sign in to continue"}
          </p>
        </div>
      </main>
    </Layout>
  )
}
