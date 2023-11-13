import { NextApiRequest, NextApiResponse } from "next"

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
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
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
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
