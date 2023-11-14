import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"

import { PermissionsContextProvider } from "../../context/permissions"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <PermissionsContextProvider>
          <Component {...pageProps} />
        </PermissionsContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
