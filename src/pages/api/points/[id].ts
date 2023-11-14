import { NextApiRequest, NextApiResponse } from "next"
import { sendToSQS } from "@/sqs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Update point account
  if (req.method === "PUT") {
    try {
      const { id } = req.query
      const { user_id, balance } = req.body
      const response = await fetch(
        `${process.env.POINT_SERVICE_URL}/api/points/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            user_id,
            balance,
          }),
        }
      )
      if (response.status === 200) {
        const queuePayload = {
          action: "UPDATE",
          target: "POINT",
          triggeredBy: "ADMIN",
          data: {
            id,
            user_id,
            balance,
          },
        }
        sendToSQS(queuePayload, "POST")
      }
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/points/${id}`, error)
      res.status(500).json({ message: error })
    }
  }
}
