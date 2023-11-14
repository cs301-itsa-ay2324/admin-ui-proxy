import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

import logo from "../../public/ascenda-logo.svg"

const loadData = (url: string) =>
  fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json() as Promise<any>
    } else {
      return resp.json().then((error) => {
        throw error
      })
    }
  })

export default function Profile() {
  const { data: session, status } = useSession()

  const loading = status === "loading"

  const handleSignIn = () =>
    signIn("cognito", { callbackUrl: process.env.NEXTAUTH_URL })

  const companyName = "Ascenda Loyalty"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <Image
            src={logo}
            width={150}
            height={50}
            alt={`${companyName} logo`}
            priority={true}
          />
        </div>
        {!session && (
          <>
            <p className="mb-4 text-center text-lg">Sign in to your account</p>
            <button
              onClick={handleSignIn}
              className="w-full rounded bg-blue-500 py-2 text-white transition duration-200 ease-in-out hover:bg-blue-600"
            >
              Sign in with Cognito
            </button>
          </>
        )}
        {loading && <span>Loading...</span>}
      </div>
    </div>
  )
}
