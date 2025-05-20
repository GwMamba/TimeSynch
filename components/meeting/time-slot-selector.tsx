"use client";

import { useState } from "react";
import { TimeZone } from "@/lib/types";

interface TimeSlotSelectorProps {
  date: Date;
  timeZones: TimeZone[];
  onSelectSlot: (slot: { start: Date; end: Date }) => void;
}

export function TimeSlotSelector({ date, timeZones, onSelectSlot }: TimeSlotSelectorProps) {
  // Simplify to just create a 9-10 AM meeting by default
  const handleSelect = () => {
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(10, 0, 0, 0);
    
    onSelectSlot({ start: startDate, end: endDate });
  };
  
  return (
    <div className="border rounded-lg p-4 w-full">
      <div className="font-medium text-lg mb-2">Select a Time Slot</div>
      
      <div className="text-sm mb-4">
        Meeting date: {date ? date.toLocaleDateString() : 'No date selected'}
      </div>
      
      <button 
        className="bg-primary text-primary-foreground px-4 py-2 rounded" 
        onClick={handleSelect}
      >
        9:00 AM - 10:00 AM
      </button>
    </div>
  );
}