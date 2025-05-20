"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeZone } from "@/lib/types";
import { toZonedTime } from "date-fns-tz";

interface MeetingFormProps {
  selectedTimeZones: TimeZone[];
  onSchedule: (meetingData: any) => void;
}

export function MeetingForm({ selectedTimeZones, onSchedule }: MeetingFormProps) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!meetingTitle || !meetingDate) {
      return;
    }

    onSchedule({
      title: meetingTitle,
      description: meetingDescription,
      date: meetingDate,
      timeZones: selectedTimeZones,
    });

    // Reset form fields
    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingDate(undefined);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="Meeting Title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Weekly Team Sync"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Discuss project progress and upcoming milestones..."
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !meetingDate && "text-muted-foreground"
                  )}
                ><CalendarIcon className="mr-2 h-4 w-4" />
                  {meetingDate ? format(meetingDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={meetingDate}
                  onSelect={setMeetingDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Participating Time Zones</Label>
            <div className="grid-gap-2">
              {selectedTimeZones.length > 0 ? (
                selectedTimeZones.map((tz) => (
                  <div
                    key={tz.id}
                    className="flex items-center rounded-md border px-3 py-2"
                  >
                    <span>{tz.label}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{tz.timeZone}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground py-2">No time zones selected. Add time zones from the dashboard.</div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!meetingTitle || !meetingDate}>Find Optimal Meeting Times</Button>
        </CardFooter>
      </form>
    </Card>
  );
}