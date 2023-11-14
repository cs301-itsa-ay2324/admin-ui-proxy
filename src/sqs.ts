import AWS from "aws-sdk"

const sqs = new AWS.SQS()

export function sendToSQS(payload: any, method: string) {
  // send to logs
  try {
    console.log(payload)
    const { action, target, triggeredBy, data } = payload
    const params: any = {
      MessageBody: JSON.stringify({
        action,
        target,
        triggeredBy,
        data,
      }),
      MessageGroupId: new Date().getTime().toString(),
      QueueUrl: process.env.SQS_QUEUE_URL!,
    }
    sqs.sendMessage(params).promise()
    console.log("Sent to SQS")
  } catch (error) {
    console.log(error)
  }
}
