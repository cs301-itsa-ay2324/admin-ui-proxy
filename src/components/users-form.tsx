import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown } from "lucide-react"
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

const UsersFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().optional(),
})

export function UsersForm({
  defaultValues,
  id,
}: {
  defaultValues?: z.infer<typeof UsersFormSchema>
  id?: string
}) {
  const isUpdate = defaultValues !== undefined && defaultValues !== null
  const [roleData, setRoleData] = useState<any[]>([])
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof UsersFormSchema>>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: isUpdate
      ? { ...defaultValues }
      : { first_name: "", last_name: "", email: "" },
  })

  async function populateRole() {
    const response = await fetch("/api/users/roles")
    const data = await response.json()
    const roleData = data.roles.map((role: any) => {
      return {
        id: role.id,
        name: role.name.toLowerCase(),
      }
    })
    return roleData
  }

  useEffect(() => {
    populateRole().then((data) => {
      setRoleData(data)
    })
  })

  async function onSubmit(values: z.infer<typeof UsersFormSchema>) {
    const method = isUpdate ? "PUT" : "POST"
    const endpoint = isUpdate ? `/api/users/${id}` : "/api/users"
    // This will be type-safe and validated.
    const response = await fetch(endpoint, {
      method: method,
      body: JSON.stringify(values),
    })
    const res = await response.json()
    if (isUpdate && defaultValues.role === "-" && values.role !== undefined) {
      // add user to cognito
      const cognitoResponse = await fetch(`/api/users/cognito`, {
        method: "POST",
        body: JSON.stringify(values),
      })
      await cognitoResponse.json()
      console.log("user added to cognito")
      // update user role in db
      const dbResponse = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          role: values.role,
        }),
      })
      await dbResponse.json()
      console.log("user role updated in db")

      await Promise.all([dbResponse, cognitoResponse])
    }
    if (response.status !== 200) {
      toast({
        variant: "destructive",
        title: "Unsuccessful",
        description: isUpdate
          ? "Something went wrong when updated user."
          : "User already exists!",
        duration: 3000,
      })
      setTimeout(() => {
        router.push("/users")
      }, 2000)
    } else {
      toast({
        title: "Success",
        description: `User ${isUpdate ? "updated" : "created"} successfully`,
        duration: 3000,
      })
      setTimeout(() => {
        router.push("/users")
      }, 2000)
    }
  }
  async function removeRole() {
    // remove user from cognito
    const cognitoResponse = await fetch(`/api/users/cognito`, {
      method: "DELETE",
      body: JSON.stringify({ username: defaultValues?.email }),
    })
    await cognitoResponse.json()

    // update user role in db to null
    const dbResponse = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        role: null,
      }),
    })
    await dbResponse.json()

    await Promise.all([dbResponse, cognitoResponse])

    if (dbResponse.status !== 200 || cognitoResponse.status !== 200) {
      toast({
        variant: "destructive",
        title: "Unsuccessful",
        description: "Something went wrong when removing user role.",
        duration: 3000,
      })
      setTimeout(() => {
        router.push("/users")
      }, 2000)
    } else {
      toast({
        title: "Success",
        description: `User role removed successfully.`,
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
          name="first_name"
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
          name="last_name"
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
                        ? Object.values(roleData).find(
                            (role) => role.name === field.value
                          )?.name
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
                      {Object.values(roleData).map((role) => (
                        <CommandItem
                          value={role.name}
                          key={role.name}
                          onSelect={() => {
                            form.setValue("role", role.name)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              role.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.name}
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
        <div className="flex w-full justify-between">
          {isUpdate && (
            <Button variant={`outline`} onClick={removeRole}>
              Remove role
            </Button>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
