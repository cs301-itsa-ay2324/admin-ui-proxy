import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

const Navbar = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000/login" })
  }

  return (
    <nav className="bg-primary px-2 py-2.5 text-primary-foreground">
      <div className="mx-auto flex items-center justify-between p-3">
        <Link href="/">Admin Panel</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
