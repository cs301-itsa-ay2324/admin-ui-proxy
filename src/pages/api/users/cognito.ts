import { NextApiRequest, NextApiResponse } from "next"
import { CognitoIdentityServiceProvider } from "aws-sdk"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cognitoISP = new CognitoIdentityServiceProvider({
    region: process.env.AWS_REGION,
  })
  if (req.method === "POST") {
    const { first_name, last_name, email } = JSON.parse(req.body)

    const params = {
      DesiredDeliveryMediums: ["EMAIL"],
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "given_name", Value: first_name },
        { Name: "family_name", Value: last_name },
      ],
    }

    try {
      await cognitoISP.adminCreateUser(params).promise()
      return res.status(200).json({ message: "User created successfully" })
    } catch (error) {
      console.error("Error creating user:", error)
      return res.status(500).json({ error: "Error creating user" })
    }
  }

  if (req.method === "PUT") {
    const { firstName, lastName, email } = req.body

    const params = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email, // Username is set to user email, assuming its immutable
      UserAttributes: [
        {
          Name: "given_name",
          Value: firstName,
        },
        {
          Name: "family_name",
          Value: lastName,
        },
      ],
    }

    try {
      await cognitoISP.adminUpdateUserAttributes(params).promise()
      res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
      console.error("Error updating user:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  if (req.method === "DELETE") {
    try {
      const { username } = JSON.parse(req.body)
      const params = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: username,
      }
      await cognitoISP.adminDeleteUser(params).promise()

      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      console.error("Error deleting user:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
