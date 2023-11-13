import { NextApiRequest, NextApiResponse } from "next"
import { CognitoIdentityServiceProvider } from "aws-sdk"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all users
  if (req.method === "GET") {
    try {
      const response = await fetch(`${process.env.USER_SERVICE_URL}/api/users`)
      const data = await response.json()
      return res.status(response.status).json(data)
    } catch (error) {
      res.status(500).json({ message: error })
    }
    // Create a new user
  } else if (req.method === "POST") {
    try {
      const cognitoISP = new CognitoIdentityServiceProvider({
        region: process.env.AWS_REGION,
      })
      const { first_name, last_name, email, role } = JSON.parse(req.body)
      const points_accounts = [0]

      // Params for Cognito
      const cognitoParams = {
        DesiredDeliveryMediums: ["EMAIL"],
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: email,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "given_name", Value: first_name },
          { Name: "family_name", Value: last_name },
        ],
      }

      // Create a new user in the database
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

      // Create a new admin user in Cognito has role
      if (role !== undefined) {
        const cognitoResponse = await cognitoISP
          .adminCreateUser(cognitoParams)
          .promise()

        console.log("User created on Cognito")

        await Promise.all([response, cognitoResponse])
        return res.status(200).json([response, cognitoResponse])
      }

      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
