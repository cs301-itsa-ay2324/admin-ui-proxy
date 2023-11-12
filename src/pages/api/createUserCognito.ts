import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST requests
  }

  const cognitoISP = new CognitoIdentityServiceProvider({
    region: process.env.AWS_REGION
  });

  const { firstName, lastName, email } = req.body;

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    Username: email,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName }
    ],
  };

  try {
    await cognitoISP.adminCreateUser(params).promise();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}
