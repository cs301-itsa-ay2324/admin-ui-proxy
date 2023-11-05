import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const getDataFromUserInfo = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const userInfoEndpoint = `${process.env.ZITADEL_ISSUER}/oidc/v1/userinfo`;

  try {
    const response = await fetch(userInfoEndpoint, {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching user info" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const token = await getToken({ req });

    if (!token || typeof token.accessToken !== "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await getDataFromUserInfo(req, res, token.accessToken);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
