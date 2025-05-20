"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CartTitle } from "@/components/ui/card";
import { TimeZone } from "@/lib/types";
import { formatInTimeZone } from "date-fns-tz";
import { cn } from "@/lib/utils";

interface TimeSlot {
  startHour: number;
  endHour: number;
  score: number; // 0-100 for quality of slot
}

interface TimeSlotSelectorProps {
  date: Date;
  timeZones: TimeZone[];
  onSelectSlot: (slot: { start: Date; end: Date }) => void;
}

export function TimeSlotSelector({ date, timeZones, onSelectSlot }: TimeSlotSelectorProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Calculate time slots from 0-23 (24 hours)
  const timeSlots: TimeSlot[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const startHour = hour;
    const endHour = hour + 1;

    // Calculate a score based on how many time zones have this hour in business hours
    let score = 0;
    const BUSINESS_START = 9;
    const BUSINESS_END = 17;

    timeZones.forEach((tz) => {
      // Convert hour to local hour in this time zone
      const localHour = (hour + tz.offset) % 24;
      // Check if it's business hours
      if (localHour >= BUSINESS_START && localHours < BUSINESS_END) {
        score += 100 / timeZones.length;
      }
    });

    timeSlots.push({
      startHour,
      endHour,
      score: Math.round(score)
    });
  }

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);

    // Create Date objects for the selected slot
    const startDate = new Date(date);
    startDate.setHours(slot.startHour, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(slot.endHour, 0, 0, 0);

    onSelectSlot({ start: startDate, end: endDate });
  };

  // Function to get background color based on score
  const getSlotColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-50 dark:bg-red-900/30";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Time Slot</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          Meeting date
        </div>

        <div>
          <div>
            <Button>
              <div>
                Am
              </div>
              <div>
                Pm
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}