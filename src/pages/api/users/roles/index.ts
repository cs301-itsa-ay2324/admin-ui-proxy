import { NextApiRequest, NextApiResponse } from "next"
import { sendToSQS } from "@/sqs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all roles with permissions
  if (req.method === "GET") {
    try {
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/roles`
      )
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      console.error(`/api/users/roles`, error)
      res.status(500).json({ message: error })
    }
  } else if (req.method === "POST") {
    try {
      const { name, permissions } = JSON.parse(req.body)
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            permissions,
          }),
        }
      )
      if (response.status === 201) {
        const queuePayload = {
          action: "CREATE",
          target: "ROLE",
          triggeredBy: "ADMIN",
          data: {
            name,
            permissions,
          },
        }
        sendToSQS(queuePayload, "POST")
      }
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      console.error(`/api/users/roles`, error)
      res.status(500).json({ message: error })
    }
  }
}
