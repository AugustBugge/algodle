"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type ComboItem = {
  value: string
  label: string
  aliases?: string[] // optional: for extra search terms
}

type AlgorithmComboboxProps = {
  items: ComboItem[]
  value?: string
  placeholder?: string
  emptyText?: string
  onValueChange?: (value: string) => void
  className?: string
  guess : (value: string) => void
}

export function AlgorithmCombobox({
  items,
  value,
  placeholder = "Choose an algorithm...",
  emptyText = "No match found.",
  onValueChange,
  className,
  guess,
}: AlgorithmComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value ?? "")

  // keep internal in sync when parent controls it
  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value)
  }, [value])

  const selected = items.find(i => i.value === internalValue)

  const handleSelect = (v: string) => {
    setInternalValue(v)
    onValueChange?.(v)
    setOpen(false)
    guess(v)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[280px] justify-between", className)}
        >
          {selected ? selected.label : <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search algorithms..." autoFocus />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  // Put aliases in the item text so they’re searchable
                  keywords={item.aliases}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.value === internalValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
