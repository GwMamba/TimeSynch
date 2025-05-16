"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "Lucide-react";
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
    <Popover>
      <PopoverTrigger>
        <Button>
          <span>
            <span>
              Add Timezone
            </span>
          </span>
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}