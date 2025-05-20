"use client";

import { useState } from "react";
import { TimeZone } from "@/lib/types";

interface MeetingFormProps {
  selectedTimeZones: TimeZone[];
  onSchedule: (meetingData: any) => void;
}

export function MeetingForm({ selectedTimeZones, onSchedule }: MeetingFormProps) {
  const [meetingTitle, setMeetingTitle] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meetingTitle) {
      return;
    }
    
    // Just use today's date for simplicity
    onSchedule({
      title: meetingTitle,
      date: new Date(),
      timeZones: selectedTimeZones.map(tz => tz.id)
    });
  };
  
  return (
    <div className="border rounded-lg p-4 w-full">
      <div className="font-medium text-lg mb-4">Schedule a Meeting</div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Meeting Title
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Weekly Team Sync"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Participating Time Zones
          </label>
          <div className="space-y-2">
            {selectedTimeZones.length > 0 ? (
              selectedTimeZones.map((tz) => (
                <div
                  key={tz.id}
                  className="border p-2 rounded"
                >
                  {tz.label}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No time zones selected. Add time zones from the dashboard.
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground p-2 rounded"
          disabled={!meetingTitle}
        >
          Find Optimal Meeting Times
        </button>
      </form>
    </div>
  );
}