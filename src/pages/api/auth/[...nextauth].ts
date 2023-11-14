import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const allowedUrls = [
        "/",
        "/login",
        "/logout",
        "/error",
        "/api/auth/signin",
        "/api/auth/signout",
        "/api/auth/session",
      ]
      if (allowedUrls.some((u) => url.startsWith(u))) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
})
