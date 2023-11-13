import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const cognitoISP = new CognitoIdentityServiceProvider({
    region: process.env.AWS_REGION
  });

  const { firstName, lastName, email } = req.body;

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    Username: email, // Username is set to user email, assuming its immutable
    UserAttributes: [
      {
        Name: 'given_name',
        Value: firstName,
      },
      {
        Name: 'family_name', 
        Value: lastName,
      },
    ],
  };

  try {
    await cognitoISP.adminUpdateUserAttributes(params).promise();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
