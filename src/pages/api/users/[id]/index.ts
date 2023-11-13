import { NextApiRequest, NextApiResponse } from "next"
import { CognitoIdentityServiceProvider } from "aws-sdk"

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
      // TODO: update cognito
      // if (role !== undefined) {
      //   const cognitoISP = new CognitoIdentityServiceProvider({
      //     region: process.env.AWS_REGION,
      //   })
      //   const params = {
      //     UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      //     Username: email, // Username is set to user email, assuming its immutable
      //     UserAttributes: [
      //       {
      //         Name: "given_name",
      //         Value: first_name,
      //       },
      //       {
      //         Name: "family_name",
      //         Value: last_name,
      //       },
      //     ],
      //   }
      // }

      return res.status(200).json(response)
    } catch (error) {
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
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
