import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default function users(req: NextApiRequest, res: NextApiResponse) {
  const userDir = path.join("config", "users.csv")
  const pointsAccountDir = path.join("config", "points_accounts.csv")

  const usersData = fs.readFileSync(userDir, "utf-8")
  const pointsAccountData = fs.readFileSync(pointsAccountDir, "utf-8")
  // Split the data into rows
  const userRows = usersData.split("\n")
  const pointsAccountRows = pointsAccountData.split("\n")
  // create hashmap
  const userMap = new Map()
  // fill map with user details
  let isFirstUserLine = true

  for (const row of userRows) {
    if (isFirstUserLine) {
      isFirstUserLine = false
      continue
    }

    const values = row.split(",")
    const user: Users = {
      id: values[0],
      name: values[2] + " " + values[3],
      email: values[1],
      points_balance: 0,
      role: "",
    }

    userMap.set(user.id, user)
  }

  let isFirstPointLine = true

  for (const row of pointsAccountRows) {
    if (isFirstPointLine) {
      isFirstPointLine = false
      continue
    }

    const values = row.split(",")
    const pointsAccount: PointsAccount = {
      id: values[0],
      user_id: values[1],
      points_balance: parseInt(values[2]),
    }

    // get user from map
    const user = userMap.get(pointsAccount.user_id)
    // add points account to user
    user.points_balance += pointsAccount.points_balance
  }

  return res.json(Array.from(userMap.values()))
}
