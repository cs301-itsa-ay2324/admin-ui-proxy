import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"

type PermissionContextType = {
  id: number
  name: string
  permissions: {
    create: boolean
    read_all: boolean
    read_non_admin: boolean
    update: boolean
    database_name: string
    id: number
    delete: boolean
  }[]
}

export const PermissionContext = createContext<
  PermissionContextType | undefined
>(undefined)

export const PermissionsContextProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const { data: session } = useSession()

  // fetch permission from /api/permissions
  const requestPermission = async () => {
    const res = await fetch(`/api/auth/permissions/${session?.user?.email}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  const { data } = useQuery("permissions", requestPermission, {
    enabled: session?.user?.email !== undefined,
  })
  return (
    <PermissionContext.Provider value={data}>
      {children}
    </PermissionContext.Provider>
  )
}

// export const usePermissionsContext = () => useContext(PermissionContext)
