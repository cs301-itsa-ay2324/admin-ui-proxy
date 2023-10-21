import React from "react"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

import { Layout } from "@/components/layout"
import { PointBalanceForm } from "@/components/pointbalance-form"

const EditPage = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Account />
    </QueryClientProvider>
  )
}

export default EditPage

const Account = () => {
  const router = useRouter()
  const { name, balance } = router.query
  const { data = {} } = useQuery("data", async () => {
    const response = await fetch(`/api/accounts/${router.query.id}`)
    const userAccount = await response.json()
    return userAccount
  })
  /*
  Note:
  data.userAccounts is an array of account ids associated with this user id
  data.userBalance is an array of account balances associated with this user id

  Unsure of the shape of the data we want to pass to the form, as a user has multiple accounts with multiple balance,
  perhaps the balance field should dynamically change depending on the account selected? but what should the default value be as well?
  questions to ask in the future, for now we just get all the accounts associated with the user id and pass it to the form to display
  */
  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">
          Adjust Points Balance
        </div>
        <PointBalanceForm
          defaultValues={{
            name: name as string,
            balance: parseInt(balance as string),
          }}
          accountData={data.userAccounts}
        />
      </div>
    </Layout>
  )
}
