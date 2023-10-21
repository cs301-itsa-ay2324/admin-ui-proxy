import { Layout } from "../components/layout"

export default function Home() {
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
