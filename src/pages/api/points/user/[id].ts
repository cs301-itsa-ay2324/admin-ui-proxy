import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user's account by user_id
  if (req.method === "GET") {
    try {
      const { id } = req.query
      const response = await fetch(
        `${process.env.POINT_SERVICE_URL}/api/points/user/${id}`
      )
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      const { id } = req.query
      console.error(`/api/points/user/${id}`, error)
      res.status(500).json({ message: error })
    }
  }
}
