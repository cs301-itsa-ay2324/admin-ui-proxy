import { NextApiRequest, NextApiResponse } from "next"
import { sendToSQS } from "@/sqs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Update role permissions
  if (req.method === "PUT") {
    try {
      const { id } = req.query
      const { permissions } = JSON.parse(req.body)
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/roles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permissions,
          }),
        }
      )
      if (response.status === 200) {
        const queuePayload = {
          action: "UPDATE",
          target: "ROLE",
          triggeredBy: "ADMIN",
          data: {
            id,
            permissions,
          },
        }
        sendToSQS(queuePayload, "POST")
      }
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/users/roles/${id}`, error)
      res.status(500).json({ message: error })
    }
    // Delete specific user
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/roles/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        const queuePayload = {
          action: "DELETE",
          target: "ROLE",
          triggeredBy: "ADMIN",
          data: {
            id,
          },
        }
        sendToSQS(queuePayload, "POST")
      }
      return res.status(200).json(response)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/users/roles/${id}`, error)
      res.status(500).json({ message: error })
    }
  }
}
