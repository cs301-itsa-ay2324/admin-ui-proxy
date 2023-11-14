import React from "react"
import { CheckIcon, ChevronDown } from "lucide-react"
import { FieldValues, UseFormGetValues, UseFormSetValue } from "react-hook-form"

import { cn } from "../../utils/cn"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command"
import { FormControl } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface PermissionsDropdownProps<TFieldValues extends FieldValues> {
  label: string
  permissions: readonly string[]
  value: string[]
  setValue: UseFormSetValue<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  name: keyof TFieldValues
}

function PermissionsDropdown<TFieldValues extends FieldValues>({
  label,
  permissions,
  value,
  setValue,
  name,
}: PermissionsDropdownProps<TFieldValues>) {
  const normalizedValue = Array.isArray(value) ? value : value ? [value] : []
  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-haspopup="listbox"
              className={cn(
                "w-[300px] justify-between",
                (!value || value.length === 0) && "text-muted-foreground"
              )}
            >
              {normalizedValue.length > 0
                ? normalizedValue.join(", ")
                : `Select ${label}`}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No permissions found.</CommandEmpty>
            <CommandGroup>
              {permissions.map((permission) => (
                <CommandItem
                  key={permission}
                  onSelect={() => {
                    const currentValueArray = Array.isArray(value)
                      ? value
                      : [value]
                    const newValue = currentValueArray.includes(permission)
                      ? currentValueArray.filter((v) => v !== permission)
                      : [...currentValueArray, permission]
                    setValue(name as any, newValue as any, {
                      shouldValidate: true,
                    })
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(permission) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default PermissionsDropdown
