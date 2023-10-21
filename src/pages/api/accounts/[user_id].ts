import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default function accounts(req: NextApiRequest, res: NextApiResponse) {
  const pointsAccountDir = path.join("config", "points_accounts.csv")
  const pointsAccountData = fs.readFileSync(pointsAccountDir, "utf-8")
  const pointsAccountRows = pointsAccountData.split("\n")
  const { user_id } = req.query
  const userAccountMap = new Map()

  let isFirstLine = true
  for (const rows of pointsAccountRows) {
    if (isFirstLine) {
      isFirstLine = false
      continue
    }
    const values = rows.split(",")
    const pointsAccount: PointsAccount = {
      id: values[0],
      user_id: values[1],
      points_balance: parseInt(values[2]),
    }
    if (pointsAccount.user_id === user_id) {
      userAccountMap.set(pointsAccount.id, pointsAccount.points_balance)
    }
  }
  const userAccounts = Array.from(userAccountMap.keys())
  const userBalances = Array.from(userAccountMap.values())

  return res.json({
    userAccounts: userAccounts,
    userBalances: userBalances,
  })
}
