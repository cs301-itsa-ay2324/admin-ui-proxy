import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/use-toast"

import { cn } from "../../utils/cn"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const PointBalanceFormSchema = z.object({
  name: z.string().min(1),
  points_account: z.string().optional(),
  balance: z.string().optional(),
})
export function PointBalanceForm({
  defaultValues,
  accountData,
  uid,
}: {
  defaultValues?: z.infer<typeof PointBalanceFormSchema>
  accountData: AccountBalance[]
  uid: string
}) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof PointBalanceFormSchema>>({
    resolver: zodResolver(PointBalanceFormSchema),
    defaultValues: { ...defaultValues },
  })
  const [selectedAccountBalance, setSelectedAccountBalance] =
    useState<string>("")

  const onAccountSelect = (accountId: string) => {
    const account = accountData.find((account) => account.id === accountId)
    setSelectedAccountBalance(account?.balance.toString() || "No balance found")
    form.setValue("points_account", accountId)
  }

  useEffect(() => {
    form.setValue("balance", selectedAccountBalance)
  }, [selectedAccountBalance, form])

  async function onSubmit(values: z.infer<typeof PointBalanceFormSchema>) {
    const id = values.points_account
    const balance = Number(values.balance)
    const response = await fetch(`/api/points/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        user_id: uid,
        balance: balance,
      }),
    })
    if (response.status !== 200) {
      toast({
        variant: "destructive",
        title: "Unsuccessful",
        description: `Failed to update points balance for ${values.name}!`,
        duration: 3000,
      })
    } else {
      toast({
        title: "Success",
        description: `Points balance updated for ${values.name}!`,
        duration: 3000,
      })
      setTimeout(() => {
        router.push("/users")
      }, 2000)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[300px] space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points_account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points Account</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? accountData.find(
                            (account) => account.id === field.value
                          )?.id || "Select Account"
                        : "Select Account"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search account..." />
                    <CommandEmpty>No account found.</CommandEmpty>
                    <CommandGroup>
                      {accountData?.map((account) => (
                        <CommandItem
                          value={account.id}
                          key={account.id}
                          onSelect={() => onAccountSelect(account.id)}
                        >
                          {account.id}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
