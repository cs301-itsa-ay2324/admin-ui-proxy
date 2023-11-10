import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import btoa from 'btoa'; // You might need to install this package or use a different method in Node.js to Base64-encode

async function getClientCredentialsToken() {
  const clientId = process.env.ZITADEL_CLIENT_ID;
  const clientSecret = process.env.ZITADEL_CLIENT_SECRET;
  const tokenEndpoint = process.env.ZITADEL_TOKEN_ENDPOINT; // Ensure this is set in your environment variables

  const basicAuthHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
  console.log(basicAuthHeader)

  const response = await fetch(tokenEndpoint!, {
    method: 'POST',
    headers: {
      'Authorization': basicAuthHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Token request failed: ${response.status} - ${errorBody}`);
    throw new Error('Failed to obtain token from ZITADEL');
  }
  

  const data = await response.json();
  return data.access_token;
}

const createUserInZitadel = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
  userData: any
) => {
  const userCreationEndpoint = `https://cs301g1t3-zsfvkc.zitadel.cloud/management/v1/users/human/_import`;

  try {
    console.log(token)
    console.log(userData)
    const response = await fetch(userCreationEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorResponse = await response.text(); // or response.json() if the response is in JSON format
        console.error("ZITADEL response error:", errorResponse);
        return res.status(response.status).json({ error: "Error creating user in ZITADEL", details: errorResponse });
      }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    try {
      const token = await getClientCredentialsToken();
      const userData = req.body;
  
      await createUserInZitadel(req, res, token, userData);
    } catch (error) {
      // Check if error is an instance of Error and log the message
      if (error instanceof Error) {
        console.error('Error in handler:', error.message);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
      }
      // For non-Error types, log a generic message
      console.error('Unknown error in handler');
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

  export default handler;
  
