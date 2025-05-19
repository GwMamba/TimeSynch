"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeZone } from "@/lib/types";

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
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <Label>Meeting Title</Label>
            <Input />
          </div>
        </CardContent>
      </form>
    </Card>
  )
}