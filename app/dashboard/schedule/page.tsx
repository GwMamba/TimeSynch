"use client";

import { useState, useEffect } from "react";
// Use relative imports instead of path aliases
import { MeetingForm } from "../../../components/meeting/meeting-form";
import { TimeSlotSelector } from "../../../components/meeting/time-slot-selector";
import { TimeZone } from "../../../lib/types";
import { timeZones as allTimeZones } from "../../../lib/timezone-data";

export default function SchedulePage() {
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>([]);
  const [meetingData, setMeetingData] = useState<any>(null);
  
  // Load selected time zones from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedTimeZones");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Find the complete time zone objects
          const zones = parsed.map((tz: any) => 
            allTimeZones.find(t => t.id === tz.id)
          ).filter(Boolean);
          setSelectedTimeZones(zones);
        } catch (e) {
          console.error("Failed to parse saved time zones", e);
        }
      }
    }
  }, []);
  
  const handleSchedule = (data: any) => {
    setMeetingData(data);
  };
  
  const handleSelectSlot = (slot: { start: Date; end: Date }) => {
    console.log("Selected slot:", slot);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule Meeting</h1>
      </div>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <MeetingForm 
          selectedTimeZones={selectedTimeZones} 
          onSchedule={handleSchedule} 
        />
        
        {meetingData && (
          <TimeSlotSelector
            date={meetingData.date}
            timeZones={selectedTimeZones}
            onSelectSlot={handleSelectSlot}
          />
        )}
      </div>
    </div>
  );
}