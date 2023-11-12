import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all users
  if (req.method === "GET") {
    try {
      const response = await fetch(`${process.env.USER_SERVICE_URL}/api/users`)
      const data = await response.json()
      return res.status(200).json(data["users"])
    } catch (error) {
      res.status(500).json({ message: error })
    }
    // Create a new user
  } else if (req.method === "POST") {
    try {
      const { first_name, last_name, email, role } = JSON.parse(req.body)
      const points_accounts = [0]
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            points_accounts,
            role,
          }),
        }
      )
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
