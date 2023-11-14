import { NextApiRequest, NextApiResponse } from "next"

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
      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
