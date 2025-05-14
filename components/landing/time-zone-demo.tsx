"use client";

import { timeZones } from "@/lib/timezone-data";
import { useEffect, useState } from "react";

const demoTimeZones = [
  { id: "new-york",
    label: "New York",
    offset: -5,
    timeZone: "Eastern Standard Time",
  },
  {
    id: "london",
    label: "London",
    offset: 0,
    timeZone: "Greenwich Mean Time",
  },
  {
    id: "berlin",
    label: "Berlin",
    offset: 1,
    timeZone: "Central European Time",
  },
  {
    id: "nairobi",
    label: "Nairobi",
    offset: 3,
    timeZone: "Moscow/Arabian Time",
  },
  {
    id: "dubai",
    label: "Dubai",
    offset: 4,
    timeZone: "Gulf Standard Time",
  },
  {
    id: "tokyo",
    label: "Tokyo",
    offset: 9,
    timeZone: "Japan Standard Time",
  },
  {
    id: "auckland",
    label: "Auckland",
    offset: 12,
    timeZone: "New Zealand Standard Time",
  },
];

export function TimeZoneDemo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-medium">Current Time across time zones</h3>
      <div className="space-y-3">
        {demoTimeZones.map((tz) => {
          // calculate the local time in this timezone
          const localTime = new Date(currentTime);
          // Adjust the timezone offset and user's local offset
          localTime.setHours(localTime.getHours() + tz.offset - new Date().getTimezoneOffset())

          // format the time
          const formattedTime = localTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });

          // Determine if it's working hours (9AM - 5PM)
          const hour = localTime.getHours();
          const isWorkingHours = hour >= 9 && hour < 17;

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