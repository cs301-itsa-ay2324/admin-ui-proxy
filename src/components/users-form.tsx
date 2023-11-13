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
    defaultValues: { ...defaultValues },
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
    if (res.error) {
      throw new Error(res.error)
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
        <div className="flex w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
