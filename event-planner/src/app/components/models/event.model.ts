export interface Event {
  _id?: string; 
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerName: string;
  attendees?: Attendee[];
}

export type AttendanceStatus = 'Going' | 'Maybe' | 'Not Going';

export interface Attendee {
  id: string;
  name: string;
  status: AttendanceStatus;
}
