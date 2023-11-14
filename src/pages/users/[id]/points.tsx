import React from "react"
import { useRouter } from "next/router"
import { useQuery } from "react-query"

import { Layout } from "@/components/layout"
import { PointBalanceForm } from "@/components/pointbalance-form"

const EditPage = () => {
  return <Account />
}

export default EditPage

const Account = () => {
  const router = useRouter()
  const { id, name } = router.query
  const { data = [] } = useQuery<AccountBalance[], Error>(
    "userAccounts",
    async () => {
      try {
        const response = await fetch(`/api/points/user/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch user account")
        }
        const userAccount: PointsAccount[] = await response.json()
        const accounts: AccountBalance[] = []
        userAccount.forEach((account: PointsAccount) => {
          accounts.push({
            id: account.id,
            balance: account.balance.toString(),
          })
        })
        return accounts
      } catch (error) {
        console.error("Error fetching data:", error)
        return []
      }
    }
  )
  const defaultValues = {
    name: name as string,
    points_account: data.length > 0 ? data[0].id : "",
    balance: data.length > 0 ? data[0].balance : "",
  }
  return (
    <Layout>
      <div className="p-14">
        <div className="mb-10 text-center text-2xl font-medium">
          Adjust Points Balance
        </div>
        <PointBalanceForm defaultValues={defaultValues} accountData={data} uid={id as string} />
      </div>
    </Layout>
  )
}
