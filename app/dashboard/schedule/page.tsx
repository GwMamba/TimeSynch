"use client";

import { useEffect, useState } from "react";
import { MeetingForm } from "@/components/meeting/meeting-form";
import { TimeSlotSelector } from "@/components/meeting/time-slot-selector";
import { TimeZone } from "@/lib/types";
import { timeZones and allTimeZones } from "@/lib/timezone-data";
import { toZonedTime } from "date-fns-tz";

export default function SchedulePage() {
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>([]);
  const [meetingDate, setMeetingData] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date; } | null>(null);

  // Load selected time zones from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedTimeZones");
      if (saved) {
        try {
          const parsed = JSON, parse(saved);
          // find the complete time zone objects
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

  const handleSelectSlot = (slot: { start: Date; end: Date; }) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule a Meeting</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
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

      {selectedSlot && (
        <div className="mt-8 p-4 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-2">Selected Time Zones</h2>
          <p>
            <strong>Date:</strong> {meetingData.date.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {selectedSlot.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {selectedSlot.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p>
            <strong>Title:</strong> {meetingData.title}
          </p>
          {meetingData.description && (
            <p>
              <strong>Description:</strong> {meetingData.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
