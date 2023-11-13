import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(); 
  }

  const cognito = new CognitoIdentityServiceProvider({
    region: process.env.AWS_REGION
  });

  try {
    const { username } = req.body; 

    const params = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: username,
    };

    await cognito.adminDeleteUser(params).promise();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
