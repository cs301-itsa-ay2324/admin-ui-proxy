import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { GanttChart, PanelLeftOpen, User2, KeyRound } from "lucide-react"

import { cn } from "../../utils/cn"
import { HamburgerButton } from "./hamburger-button"

const sidebarLinks: SidebarNavItem[] = [
  {
    title: "Users",
    href: "/users",
    icon: <User2 />,
  },
  {
    title: "Logs",
    href: "/logs",
    icon: <GanttChart />,
  },
  {
    title: "Access Control",
    href: "/access-control",
    icon: <KeyRound />,
  }
]

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)

  const location = useRouter()
  return (
    <div>
      <div
        className={`${
          open ? "w-52" : "w-fit"
        } relative hidden h-screen border-r-2 border-primary/10 p-5 duration-300 sm:block`}
      >
        <PanelLeftOpen
          className={cn(
            { "rotate-180": open },
            "absolute -right-6 top-7 h-fit w-10 cursor-pointer rounded-lg border-2 border-primary/10 bg-background p-1"
          )}
          onClick={() => setOpen(!open)}
        />

        <ul className="flex flex-col gap-y-3">
          {sidebarLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={cn("border-l-4 border-transparent", {
                " border-l-4 border-primary": location.pathname === link.href,
              })}
            >
              <li
                className={cn(
                  "flex cursor-pointer items-center gap-x-6 rounded-lg  px-3 py-2 text-base font-normal hover:bg-primary/10",
                  { "rounded-l-none": location.pathname === link.href }
                )}
              >
                <span className="p-1.5 text-2xl">{link.icon}</span>
                <span
                  className={cn({ hidden: !open }, "origin-left duration-300")}
                >
                  {link.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={cn(
            mobileMenu ? "flex" : "hidden",
            "absolute left-6 right-6 z-50 mt-5 flex-col items-center space-y-6 self-end rounded-lg border bg-white/90 py-8 font-bold sm:w-auto"
          )}
        >
          {sidebarLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              onClick={() => setMobileMenu(false)}
              className={cn(
                {
                  "underline decoration-wavy underline-offset-8":
                    location.pathname === link.href,
                },
                "hover:bg-light flex w-24 items-center justify-center gap-x-1 rounded-lg py-2 pl-1 pr-2"
              )}
            >
              <span className="p-1.5 text-2xl">{link.icon}</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
