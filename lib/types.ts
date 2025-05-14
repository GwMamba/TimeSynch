export interface TimeZone {
  id: string;
  name: string;
  label: string;
  offset: number;
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

