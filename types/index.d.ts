declare type SidebarNavItem = {
  title: string
  href: string
  icon: React.ReactElement
}

declare type Users = {
  id: string
  name: string
  email: string
  points_balance: number
  role: string
}

declare type PointsAccount = {
  id: string
  user_id: string
  balance: string
}

declare type Logs = {
  id: string
  timestamp: string
  action: string
  target: string
  triggeredBy: string
  data: string
}

declare interface Permissions {
  create: boolean
  database_name: string
  delete: boolean
  id: number
  read_all: boolean
  read_non_admin: boolean
  update: boolean
}

declare type Roles = {
  id: string
  name: string
  permissions: Permissions[]
}

declare type RolesPermissions = {
  id: string
  name: string
  users_service_permissions: Array<string>
  points_service_permissions: Array<string>
  logs_service_permissions: Array<string>
}

declare type CRUD = ("Create" | "Update" | "Delete" | "Read All" | "Read Non Admin")

declare type AccountBalance = {
  id: string
  balance: string
}
