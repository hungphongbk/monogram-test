import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { verifyIdToken } from "next-firebase-auth";
import { prisma } from "./db";

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  User?: User;
}

const decodeBase64 = (string: string) => {
  const body = Buffer.from(string, "base64").toString("utf8");
  return JSON.parse(body);
};

const withAuthUserTokenAPI: <T extends unknown>(
  handler: (
    authReq: AuthenticatedNextApiRequest,
    res: NextApiResponse<T>
  ) => void
) => (req: NextApiRequest, res: NextApiResponse) => void =
  (handler) => async (req, res) => {
    const { idToken } = JSON.parse(
      decodeBase64(req.cookies["mweeter.AuthUserTokens"])
    );
    const AuthUser = await verifyIdToken(idToken);
    const user = await prisma.user.findUnique({
      where: { id: AuthUser.id! },
    });
    (req as AuthenticatedNextApiRequest).User = user!;
    handler(req, res);
  };

export default withAuthUserTokenAPI;
