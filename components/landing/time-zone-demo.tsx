"use client";

import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";

const demoTimeZones = [
  { id: 'new-york', label: 'New York', timeZone: 'America/New_York' },
  { id: 'london', label: 'London', timeZone: 'Europe/London' },
  { id: 'berlin', label: 'Berlin', timeZone: 'Europe/Berlin' },
  { id: 'nairobi', label: 'Nairobi', timeZone: 'Africa/Nairobi' },
  { id: 'dubai', label: 'Dubai', timeZone: 'Asia/Dubai' },
  { id: 'tokyo', label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { id: 'auckland', label: 'Auckland', timeZone: 'Pacific/Auckland' },
];

const BUSINESS_START_HOUR = 9; // 9 AM
const BUSINESS_END_HOUR = 17; // 5 PM

export function TimeZoneDemo() {
  // Initialize with null for ssr to avoid hydration errors
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Set the initial time on the client side only
  useEffect(() => {
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate business hour overlaps between all time zones
  const calculateOverlaps = () => {
    if (!currentTime) return { overlaps: [], overlapSummary: "" };

    const timeZoneHours: Record<string, { start: number, end: number }> = {};

    // Get business hours for each time zone in terms of UTC hours
    demoTimeZones.forEach(tz => {
      const localMidnight = new Date(
        formatInTimeZone(currentTime, tz.timeZone, "yyyy-MM-dd'T'00:00:00")
      );

      // Convert business hours to UTC hours
      const businessStartUTC = new Date(localMidnight);
      businessStartUTC.setHours(businessStartUTC.getHours() + BUSINESS_START_HOUR);

      const businessEndUTC = new Date(localMidnight);
      businessEndUTC.setHours(businessEndUTC.getHours() + BUSINESS_END_HOUR);

      timeZoneHours[tz.id] = {
        start: businessStartUTC.getUTCHours(),
        end: businessEndUTC.getUTCHours(),
      };
    });

    // Find overlaps between each pair
    const overlaps: { pair: string[], hours: number }[] = [];

    for (let i = 0; i < demoTimeZones.length; i++) {
      for (let j = i + 1; j < demoTimeZones.length; j++) {
        const tz1 = demoTimeZones[i];
        const tz2 = demoTimeZones[j];

        const hours1 = timeZoneHours[tz1.id];
        const hours2 = timeZoneHours[tz2.id];

        // Calculate overlap hours
        const overlapStart = Math.max(hours1.start, hours2.start);
        const overlapEnd = Math.min(hours1.end, hours2.end);

        const overlapHours = Math.max(0, overlapEnd - overlapStart);

        if (overlapHours > 0) {
          overlaps.push({
            pair: [tz1.id, tz2.id],
            hours: overlapHours
          });
        }
      }
    }

    // Create a summary of all overlaps
    let overlapSummary = "";

    if (overlaps.length === 0) {
      overlapSummary = "No business hours overlap between these time zones";
    } else {
      const totalPairs = (demoTimeZones.length * (demoTimeZones.length - 1)) / 2;

      if (overlaps.length === totalPairs) {
        // All time zones have some overlap with each other
        const minOverlap = Math.min(...overlaps.map(o => o.hours));
        overlapSummary = `All time zones have at least ${minOverlap} hour${minOverlap > 1 ? "s" : ""} of business hour overlap.`;
      } else {
        // Some time zones overlap, others don't
        overlapSummary = `${overlaps.length} of ${totalPairs} time zone pairs have business hour overlaps.`;
      }
    }

    return { overlaps, overlapSummary };
  };

  if (!currentTime)
    return (
      <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-medium">Current Time across time zones</h3>
        <div className="space-y-3">
          {demoTimeZones.map((tz) => (
            <div
              key={tz.id}
              className="flex items-center justify-between rounded-md p-3 bg-gray-100 dark:bg-gray-800"
            >
              <div>
                <p className="font-medium">{tz.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tz.timeZone}</p>
              </div>
              <div className="text-xl font-semibold">Loading...</div>
            </div>
          ))}
        </div>
      </div>
    );

  // Get the overlaps information
  const { overlaps, overlapSummary } = calculateOverlaps();

  // Function to check if two time zones have business hours overlap
  const hasOverlap = (id1: string, id2: string) => {
    return overlaps.some(o =>
      (o.pair[0] === id1 && o.pair[1] === id2) ||
      (o.pair[0] === id2 && o.pair[1] === id1)
    );
  };

  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-medium">Current Time across time zones</h3>
      <div className="space-y-3">
        {demoTimeZones.map((tz) => {
          // Format the time using the IANA time zone
          const formattedTime = formatInTimeZone(
            currentTime, 
            tz.timeZone, 
            "h:mm aa"
          );

          // Get the local hour in this time zone for working hours check
          const hourInTimeZone = parseInt(
            formatInTimeZone(currentTime, tz.timeZone, "H")
          );

          // Determine if it's working hours (9AM to 5PM)
          const isWorkingHours = hourInTimeZone >= BUSINESS_START_HOUR && hourInTimeZone < BUSINESS_END_HOUR;

          // Find all time zones that this one has business hour overlaps with
          const overlappingZones = demoTimeZones
            .filter(otherTz => otherTz.id !== tz.id && hasOverlap(tz.id, otherTz.id))
            .map(otherTz => otherTz.label);

          return (
            <div
              key={tz.id}
              className={`flex items-center justify-between rounded-md p-3 ${
                isWorkingHours 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <div className="flex-1">
                <p className="font-medium">{tz.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tz.timeZone}</p>
                {overlappingZones.length > 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Overlaps with: {overlappingZones.join(', ')}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end min-w-[120px]">
                <div className="text-xl font-semibold">{formattedTime}</div>
                <div className="text-xs">
                  {isWorkingHours 
                    ? "Business hours" 
                    : "Outside business hours"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-md bg-amber-100 p-3 dark:bg-amber-900/30">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          {overlapSummary}
        </p>
      </div>
    </div>
  );
}