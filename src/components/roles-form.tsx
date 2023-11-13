import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/use-toast"

import { Button } from "./button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"
import PermissionsDropdown from "./permission-dropdown"

const permissions = [
  "create",
  "update",
  "delete",
  "read-all",
  "read-admin",
] as const

const RolesFormSchema = z.object({
  role: z.string().min(1),
  users_service: z.array(z.enum(permissions)),
  points_service: z.array(z.enum(permissions)),
  logs_service: z.array(z.enum(permissions)),
})

export function RolesForm({
  defaultValues,
  id,
}: {
  defaultValues?: z.infer<typeof RolesFormSchema>
  id?: string
}) {
  const isUpdate = defaultValues !== undefined && defaultValues !== null
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof RolesFormSchema>>({
    resolver: zodResolver(RolesFormSchema),
    defaultValues: {
      ...defaultValues,
      users_service: defaultValues?.users_service || [],
      points_service: defaultValues?.points_service || [],
      logs_service: defaultValues?.logs_service || [],
    },
  })

  async function onSubmit(values: z.infer<typeof RolesFormSchema>) {
    console.log(values)
    // const method = isUpdate ? "PUT" : "POST"
    // const endpoint = isUpdate ? `/api/users/${id}` : "/api/users"
    // // This will be type-safe and validated.
    // const response = await fetch(endpoint, {
    //   method: method,
    //   body: JSON.stringify(values),
    // })
    // const res = await response.json()
    // if (res.error) {
    //   throw new Error(res.error)
    // } else {
    //   toast({
    //     title: "Success",
    //     description: `User ${isUpdate ? "updated" : "created"} successfully`,
    //     duration: 3000,
    //   })
    //   setTimeout(() => {
    //     router.push("/users")
    //   }, 2000);
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="users_service"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Users Service</FormLabel>
              <PermissionsDropdown
                label="Users Service Permissions"
                permissions={permissions}
                name="users_service"
                getValues={form.getValues}
                setValue={form.setValue}
                value={form.getValues("users_service")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points_service"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Points Service</FormLabel>
              <PermissionsDropdown
                label="Points Service Permissions"
                permissions={permissions}
                name="points_service"
                getValues={form.getValues}
                setValue={form.setValue}
                value={form.getValues("points_service")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logs_service"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Logs Service</FormLabel>
              <PermissionsDropdown
                label="Logs Service Permissions"
                permissions={permissions}
                name="logs_service"
                getValues={form.getValues}
                setValue={form.setValue}
                value={form.getValues("logs_service")}
              />
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
