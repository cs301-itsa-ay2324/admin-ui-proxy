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
  points_balance: number
}

declare type Logs = {
  id: string
  desc: string
  datetime: string
  device_info: string
}

declare type RolesPermissions = {
  id: string
  users_service_permissions: Array<string>
  points_service_permissions: Array<string>
  logs_service_permissions: Array<string>
}
