"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { timeZones } from "@/lib/timezone-data";
import { TimeZone } from "@/lib/types";

interface TimezonePickerProps {
  onSelect: (timezone: TimeZone) => void;
}

export function TimeZonePicker({ onSelect }: TimeZonePickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[250px]"
        >
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Timezone</span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[250px]">
        <Command>
          <CommandInput placeholder="Search time zones..." />
          <CommandEmpty>No time zone found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {timeZones.map((timezone) => (
              <CommandItem
                key={timezone.id}
                value={timezone.label}
                onSelect={() => {
                  setValue(timezone.label);
                  setOpen(false);
                  onSelect(timezone);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === timezone.label ? "opacity-100" : "opacity-0"
                  )}
                />
                {timezone.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}