import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { roles } from "../../config/roles"
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

const UsersFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string(),
})

export function UsersForm({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof UsersFormSchema>
}) {
  const form = useForm<z.infer<typeof UsersFormSchema>>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: { ...defaultValues },
  })
  const { data: session } = useSession()
  console.log(session)
  console.log(session?.accessToken)
  async function onSubmit(values: {
    firstName: string
    lastName: string
    email: string
    role: string
  }) {

    const body = {
      userName: `${values.firstName.toLowerCase()}-${values.lastName.toLowerCase()}`,
      profile: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      email: {
        email: values.email,
        isEmailVerified: true,
      },
      passwordChangeRequired: true,
      requestPasswordlessRegistration: true,
    }
    //try {
    //     const test = await fetch(
    //     "https://cs301g1t3-zsfvkc.zitadel.cloud/management/v1/users/"+session?.user?.id,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${session?.accessToken}`,
    //       },
    //     }
    //   )
    //   const testData = await test.json()
    //   console.log(testData)
      
      // const createUserResponse = await fetch(
      //   `https://cs301g1t3-zsfvkc.zitadel.cloud/management/v1/users/human/_import`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization": `Bearer ${session?.accessToken}`,
      //     },
      //     body: JSON.stringify(body),
      //   }
      // )

      fetch('/api/createUserInZitadel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(response => {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          return response.json();
        }
        throw new Error('Non-JSON response received');
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      

    //   if (!createUserResponse.ok) {
    //     throw new Error(`HTTP error! status: ${createUserResponse.status}`)
    //   } else {
    //     console.log(createUserResponse.json())
    //   }
    // } catch (error) {
    //   console.error("Error in user creation or role assignment:", error)
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[300px] space-y-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Role</FormLabel>
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
                        ? roles.find((role) => role.value === field.value)
                            ?.label
                        : "Select Role"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search role..." />
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.label}
                          key={role.value}
                          onSelect={() => {
                            form.setValue("role", role.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              role.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.label}
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
        <div className="flex w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
