import { Inter } from "next/font/google"

import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { Toaster } from "./toaster"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children?: React.ReactElement
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className={`${inter.className} h-screen`}>
      <Navbar />
      <div className="flex flex-auto">
        <Sidebar />
        <div className="grow overflow-y-auto overflow-x-scroll">
          <div>{children}</div>
        </div>
        <Toaster />
      </div>
    </main>
  )
}
