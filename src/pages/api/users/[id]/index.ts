import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get specific user details
  if (req.method === "GET") {
    try {
      const { UID } = req.query
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/${UID}`
      )
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
    // Update specific user details
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query
      const { first_name, last_name, email, role } = JSON.parse(req.body)
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
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
    // Delete specific user
  } else if (req.method === "DELETE") {
    console.log("DELETE")
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.USER_SERVICE_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
