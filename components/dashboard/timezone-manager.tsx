"use client";

import { useState, useEffect } from "react";
import { TimeZoneCard } from "./timezone-card";
import { TimeZonePicker } from "./timezone-picker";
import { timeZones } from "@/lib/timezone-data";
import { TimeZone } from "@/lib/types";

export function TimeZoneManager() {
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>([]);

  // Load time zones from localStorage on initial render
  useEffect(() => {
    // Check if we're in the broswer environment (not during server side rendering)
    if (typeof window !== "undefined") {
      const savedTimeZones = localStorage.getItem("selectedTimeZones");

      if (savedTimeZones) {
        try {
          setSelectedTimeZones(JSON.parse(savedTimeZones));
        } catch (e) {
          console.error("Failed to parse saved time zones", e);
          setDefaultTimeZones();
        }
       } else {
          // set default time zones if none are saved
          setDefaultTimeZones();
        }
      }
    }, []);

  const setDefaultTimeZones = () => {
    const defaults = [
      timeZones.find((tz) => tz.id === "America/New_York"),
      timeZones.find(tz => tz.id === "London"),
      timeZones.find(tz => tz.id === "Tokyo"),
      timeZones.find(tz => tz.id === "Nairobi"),
    ].filter(Boolean) as TimeZone[];

    setSelectedTimeZones(defaults);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTimeZones", JSON.stringify(defaults));
    }
  };

  // Save to localStorage whenever selected time zones change
  useEffect(() => {
    if (typeof window !== "undefined" && selectedTimeZones.length > 0) {
      localStorage.setItem("selectedTimeZones", JSON.stringify(selectedTimeZones));
    }
  }, [selectedTimeZones]);

  const addTimeZone = (timezone: TimeZone) => {
    if (!selectedTimeZones.some((tz) => tz.id === timezone.id)) {
      setSelectedTimeZones([...selectedTimeZones, timezone]);
    }
  };

  const removeTimeZone = (id: string) => {
    setSelectedTimeZones(selectedTimeZones.filter(tz => tz.id !== id));
  };

  return (
    <div>
      <div>
        <h2>Your Timezones</h2>
      </div>


      <div>
        <div>
          <p>No time zones added yet. Use the "Add Time Zone" button to get started.</p>
        </div>
      </div>
    </div>
  );
}
