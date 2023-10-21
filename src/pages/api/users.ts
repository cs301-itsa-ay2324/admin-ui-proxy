import { NextApiRequest, NextApiResponse } from "next"

import { pointsAccountData } from "../../../config/points-accounts"
import { usersData } from "../../../config/users"

export default function users(req: NextApiRequest, res: NextApiResponse) {
  const userRows = usersData

  const pointsAccountRows = pointsAccountData
  const userMap = new Map()

  for (const row of userRows) {
    const user: Users = {
      id: row.id,
      name: row.first_name + " " + row.last_name,
      email: row.email,
      points_balance: 0,
      role: "",
    }

    userMap.set(user.id, user)
  }

  for (const row of pointsAccountRows) {
    const pointsAccount: PointsAccount = {
      id: row.id,
      user_id: row.user_id,
      points_balance: row.balance,
    }

    // get user from map
    const user = userMap.get(pointsAccount.user_id)
    // add points account to user
    user.points_balance += pointsAccount.points_balance
  }

  return res.json(Array.from(userMap.values()))
}
