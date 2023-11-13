import { use } from "chai"
import { useSession } from "next-auth/react"

import { Layout } from "../components/layout"

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
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
