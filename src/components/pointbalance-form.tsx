import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  balance: z.number().optional(),
})
export function PointBalanceForm({
  defaultValues,
  accountData,
}: {
  defaultValues?: z.infer<typeof PointBalanceFormSchema>
  accountData: string[]
}) {
  const form = useForm<z.infer<typeof PointBalanceFormSchema>>({
    resolver: zodResolver(PointBalanceFormSchema),
    defaultValues: { ...defaultValues },
  })

  function onSubmit(values: z.infer<typeof PointBalanceFormSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values)
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
                            (account_id) => account_id === field.value
                          )
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
                      {accountData?.map((account_id) => (
                        <CommandItem
                          value={account_id}
                          key={account_id}
                          onSelect={() => {
                            form.setValue("points_account", account_id)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              account_id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {account_id}
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
        {/* TODO: make this dynamically change based on selected points_account */}
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} />
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
