// Typing declarations for NextAuth
import NextAuth, { Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id: number;
    role: string;
  }

  interface Session extends NextAuthSession {
    user?: User;
    clientId?: string;
    error?: string;
  }
}

interface CustomUser {
  id: string;
  email: string;
  role: string;
}

interface CustomToken extends JWT {
  user?: CustomUser;
}
