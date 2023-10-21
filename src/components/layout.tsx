import { Inter } from "next/font/google"

import Navbar from "./navbar"
import Sidebar from "./sidebar"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children?: React.ReactElement
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className={`${inter.className}`}>
      <Navbar />
      <div className="flex flex-auto">
        <Sidebar />
        <div className="grow overflow-x-scroll">
          <div>{children}</div>
        </div>
      </div>
    </main>
  )
}
