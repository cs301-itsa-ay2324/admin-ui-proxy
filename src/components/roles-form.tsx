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
  "Create",
  "Update",
  "Delete",
  "Read All",
  "Read Non Admin",
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
  status,
}: {
  defaultValues?: z.infer<typeof RolesFormSchema>
  id?: string
  status: "create" | "update"
}) {
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

  function mapToFrontendPermissions(servicePermissions: string[]) {
    const permissionsMap: any = {
      create: false,
      read_all: false,
      read_non_admin: false,
      update: false,
      delete: false,
    }
    servicePermissions.forEach((permission) => {
      const key = permission.replace(/-/g, "_").toLowerCase().replace(" ", "_")
      if (key in permissionsMap) {
        permissionsMap[key] = true
      }
    })
    return permissionsMap
  }

  async function onSubmit(values: z.infer<typeof RolesFormSchema>) {
    console.log(values)
    const method = status === "create" ? "POST" : "PUT"
    const endpoint =
      status === "create" ? "/api/users/roles" : `/api/users/roles/${id}`
    const reqBody = {
      name: values.role.toUpperCase(),
      permissions: [
        {
          database_name: "USER",
          ...mapToFrontendPermissions(values.users_service),
        },
        {
          database_name: "POINTS",
          ...mapToFrontendPermissions(values.points_service),
        },
        {
          database_name: "LOGS",
          ...mapToFrontendPermissions(values.logs_service),
        },
      ],
    }
    console.log(reqBody)
    // This will be type-safe and validated.
    const response = await fetch(endpoint, {
      method: method,
      body: JSON.stringify(reqBody),
    })
    const res = await response.json()
    if (res.error) {
      throw new Error(res.error)
    } else if (res.id == id) {
      toast({
        title: "Success",
        description: `Role ${status} successfully`,
        duration: 3000,
      })
      setTimeout(() => {
        router.push("/access-control")
      }, 2000)
    }
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
