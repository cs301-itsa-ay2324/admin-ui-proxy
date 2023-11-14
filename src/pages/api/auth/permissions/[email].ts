import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email } = req.query
    try {
      // get all users
      const allUsers = await fetch(`${process.env.USER_SERVICE_URL}/api/users`)
      const users = await allUsers.json()

      // get the role of the user from user service via email
      const user = await users.users.find((user: any) => user.email === email)
      const role_id = user.role_id

      // get the permissions of the role from /api/users/roles
      const allRoles = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/roles`
      )
      const roles = await allRoles.json()
      const role = await roles.roles.find((role: any) => role.id === role_id)

      // return [{}] of permissions
      res.status(200).json(role)
    } catch (error) {
      const { email } = req.query
      console.error(`/api/permissions/${email}`, error)
      res.status(500).json({ message: error })
    }
  }
}
