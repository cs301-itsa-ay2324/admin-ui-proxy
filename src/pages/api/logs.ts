import type { NextApiRequest, NextApiResponse } from "next"
import AWS from "aws-sdk"

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const lambda = new AWS.Lambda()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const lambdaResponse = await lambda
        .invoke({
          FunctionName: process.env.READ_LAMBDA_FUNCTION_NAME!,
          InvocationType: "RequestResponse",
        })
        .promise()
      res.status(200).json(JSON.parse(lambdaResponse.Payload as string))
    } catch (error) {
      console.error("/api/logs", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
