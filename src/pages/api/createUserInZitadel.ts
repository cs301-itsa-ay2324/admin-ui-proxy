import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { getToken, JWT } from "next-auth/jwt"

async function getClientCredentialsToken() {
  // REFERENCES:
  // https://zitadel.com/docs/apis/openidoauth/endpoints#client-credentials-grant
  // https://github.com/zitadel/examples-api-access-and-token-introspection/blob/main/service-user-client-credentials/README.md

  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const PROJECT_ID = process.env.ZITADEL_PROJECT_ID

  // Encode the client ID and client secret in Base64
  const clientCredentials = `${CLIENT_ID}:${CLIENT_SECRET}`
  const base64ClientCredentials = Buffer.from(
    clientCredentials,
    "utf-8"
  ).toString("base64")

  // Request an OAuth token from ZITADEL
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${base64ClientCredentials}`,
  }

  const data = new URLSearchParams()
  data.append("grant_type", "client_credentials")
  data.append(
    "scope",
    `openid profile email urn:zitadel:iam:org:project:id:${PROJECT_ID}:aud read:messages`
  )
  console.log("sending request...")
  try {
    const response = await axios.post(
      "https://cs301g1t3-zsfvkc.zitadel.cloud/oauth/v2/token",
      data,
      { headers }
    )
    const accessToken = response.data.access_token
    console.log("Response:", response.data)
    console.log("Access token:", accessToken)
    return accessToken
  } catch (error) {
    console.log(error)
  }
}

const createUserInZitadel = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const userCreationEndpoint = `${process.env.ZITADEL_ISSUER}/management/v1/users/human/_import`

  try {
    console.log(token)
    console.log(req.body)
    const response = await axios.post(userCreationEndpoint, req.body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (response.status !== 200) {
      const errorResponse = await response.data()
      console.error("ZITADEL response error:", errorResponse)
      return res.status(response.status).json({
        error: "Error creating user in ZITADEL",
        details: errorResponse,
      })
    }

    const data = await response.data()
    return res.status(200).json(data)
  } catch (error) {
    console.error("Error creating user:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const token = await getClientCredentialsToken()
    // const token = await getToken({ req })
    console.log("token", token)
    await createUserInZitadel(req, res, token)
  } catch (error) {
    // Check if error is an instance of Error and log the message
    if (error instanceof Error) {
      console.error("Error in handler:", error.message)
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message })
    }
    // For non-Error types, log a generic message
    console.error("Unknown error in handler")
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

export default handler
