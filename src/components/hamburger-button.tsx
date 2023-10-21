import { Dispatch, SetStateAction } from "react"
import { Menu } from "lucide-react"

import { cn } from "../../utils/cn"

export const HamburgerButton = ({
  setMobileMenu,
  mobileMenu,
}: {
  setMobileMenu: Dispatch<SetStateAction<boolean>>
  mobileMenu: Boolean
}) => {
  return (
    <button
      onClick={() => setMobileMenu(!mobileMenu)}
      className={cn("hamburger block focus:outline-none sm:hidden", {
        open: mobileMenu,
      })}
    >
      <Menu className="ml-2 h-fit w-10 rounded-lg border p-2 hover:bg-gray-100" />
    </button>
  )
}
