"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "Lucide-react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // format the time using the IANA time zone
  const formattedTime = formatInTimeZone(
    currentTime,
    timeZone,
    "h:mm a",
  );

  const formattedDate = formatInTimeZone(
    currentTime,
    timeZone,
    "EEE, MM d"
  );

  // Get local hour in this time zone for working hours check
  const hourInTimeZone = parseInt(
    formatInTimeZone(currentTime, timeZone, "H")
  );

  // Determine if it's working hours (9 AM - 5 PM)
  const isWorkingHours = hourInTimeZone >= BUSINESS_START_HOUR && hourInTimeZone < BUSINESS_END_HOUR;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Button>
            <X />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <span>{formattedTime}</span>
          <span>{formattedDate}</span>
          <span>{timeZone}</span>
          <span>{isWorkingHours}</span>
        </div>
      </CardContent>
    </Card>
  );
}