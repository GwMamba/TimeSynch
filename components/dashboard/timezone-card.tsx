"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";

interface TimeZoneCardProps {
  id: string;
  label: string;
  timeZone: string;
  onRemove: () => void;
}

const BUSINESS_START_HOUR = 9; // 9 AM
const BUSINESS_END_HOUR = 17; // 5 PM

export function TimeZoneCard({ id, label, timeZone, onRemove }: TimeZoneCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState("--:-- --");
  const [formattedDate, setFormattedDate] = useState("---");
  const [hourInTimeZone, setHourInTimeZone] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      // format the time using the IANA time zone
      const time = formatInTimeZone(
        currentTime,
        timeZone,
        "h:mm a",
      );

      const date = formatInTimeZone(
        currentTime,
        timeZone,
        "EEE, MM d"
      );

      const hour = parseInt(
        formatInTimeZone(currentTime, timeZone, "H")
      );

      setFormattedTime(time);
      setFormattedDate(date);
      setHourInTimeZone(hour);
      setError(null);
    } catch (e) {
      console.error(`Error formatting time for ${timeZone}:`, e);
      setError(`Invalid time zone: ${timeZone}`);
    }
  }, [currentTime, timeZone]);


  // Determine if it's working hours (9 AM - 5 PM)
  const isWorkingHours = hourInTimeZone >= BUSINESS_START_HOUR && hourInTimeZone < BUSINESS_END_HOUR;

  return (
    <Card className={cn(
      "relative transition-colors",
      isWorkingHours ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{label}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-3xl font-bold time-gradient">{formattedTime}</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
          <span className="mt-2 text-xs text-muted-foreground">{timeZone}</span>
          <span className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">{isWorkingHours ? "Business hours (9 AM - 5 PM)" : "Outside business hours"}</span>
        </div>
      </CardContent>
    </Card>
  );
}