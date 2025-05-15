"use client";

import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";

const demoTimeZones = [
  { id: 'new-york', label: 'New York', timeZone: 'America/New_York' },
  { id: 'london', label: 'London', timeZone: 'Europe/London' },
  { id: 'tokyo', label: 'Tokyo', timeZone: 'Asia/Tokyo' },
];


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



  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-medium">
        Current Time across time zones
      </h3>
      <div className="space-y-3">
        {demoTimeZones.map((tz) => {

          // Format the time using the IANA time zone
          const formattedTime = formatInTimeZone(currentTime, tz.timeZone, "h:mm aa"
          );

          // Get the local hour in this time zone for working hours check
          const hourInTimeZone = parseInt(formatInTimeZone(currentTime, tz.timeZone, "H")
          );

          // Determine if it's working hours (9AM to 5PM)
          const isWorkingHours = hourInTimeZone >= 9 && hourInTimeZone < 17;

          return (
            <div
              key={tz.id}
              className={`flex items-center justify-between rounded-md p-3 ${isWorkingHours ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              <div>
                <p className="font-medium">{tz.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tz.timeZone}</p>
              </div>
              <div className="text-xl font-semibold">{formattedTime}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-md bg-amber-100 p-3 dark:bg-amber-900/30">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Only 4 working hours overlap between these time zones!
        </p>
      </div>
    </div>
  );
}
