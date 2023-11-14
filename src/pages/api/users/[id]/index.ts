import { NextApiRequest, NextApiResponse } from "next"
import { sendToSQS } from "@/sqs"
import AWS from "aws-sdk"

const sqs = new AWS.SQS()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get specific user details
  if (req.method === "GET") {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/${id}`
      )
      return res.status(200).json(response)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/users/${id}`, error)
      res.status(500).json({ message: error })
    }
    // Update specific user details
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query
      const { first_name, last_name, email, role } = JSON.parse(req.body)
      // update db
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            role,
          }),
        }
      )
      if (response.status === 200) {
        const queuePayload = {
          action: "UPDATE",
          target: "USER",
          triggeredBy: "ADMIN",
          data: {
            id,
            email,
            first_name,
            last_name,
            role,
          },
        }
        sendToSQS(queuePayload, "POST")
      }
      return res.status(200).json(response)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/users/${id}`, error)
      res.status(500).json({ message: error })
    }
    // Delete specific user
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/${id}`,
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
          target: "USER",
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
      console.error(`/api/users/${id}`, error)
      res.status(500).json({ message: error })
    }
  }
}
