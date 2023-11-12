import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER
    })
  ],
  pages: {
    signIn: '/login',  // path to the sign-in page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    }
  }
})
