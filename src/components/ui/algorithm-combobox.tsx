"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboItem = {
  value: string;
  label: string;
  aliases?: string[]; // optional: for extra search terms
};

type AlgorithmComboboxProps = {
  items: ComboItem[];
  value?: string;
  placeholder?: string;
  emptyText?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  guess: (value: string) => void;
};

export function AlgorithmCombobox({
  items,
  value,
  placeholder = "Choose an algorithm...",
  emptyText = "No match found.",
  onValueChange,
  className,
  guess,
}: AlgorithmComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value ?? "");
  const [selectedValue, setSelectedValue] = React.useState(value ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Keep internal value in sync when parent controls it
  React.useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
      setSelectedValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Only open the popover if there is text in the input
    if (newValue.trim().length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (v: string) => {
    const item = items.find((item) => item.value === v);
    if (item) {
      setInputValue(item.label);
      setSelectedValue(v);
      onValueChange?.(v);
      setOpen(false);
      guess(v);
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      // If we have filtered items and the dropdown is open, select the first one
      if (open && filteredItems.length > 0) {
        handleSelect(filteredItems[0].value);
        return;
      }

      // Otherwise try exact match or submit as-is
      const matchingItem = items.find(
        (item) => item.label.toLowerCase() === inputValue.toLowerCase()
      );
      if (matchingItem) {
        handleSelect(matchingItem.value);
      } else {
        guess(inputValue);
      }
    }
    setOpen(false);
  };

  // This ensures we don't lose filtering when typing
  const filteredItems = React.useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    [items, inputValue]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative inline-block w-[280px]">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn("w-[280px]", className)}
          onFocus={() => {
            if (inputValue.trim().length > 0 && filteredItems.length > 0) {
              setOpen(true);
            }
          }}
        />

        {open && filteredItems.length > 0 && (
          <div className="absolute left-0 top-full z-50 mt-1 w-[280px] rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
            <Command className="w-[280px]">
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      keywords={item.aliases}
                      onSelect={() => handleSelect(item.value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === selectedValue
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </form>
  );
}
