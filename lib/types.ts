export interface TimeZone {
  id: string;
  label: string;
  offset: number;
  timeZone: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  timeZone: string[];
}

