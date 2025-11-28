export interface Event{
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location:string;
    role: 'organizer' | 'attendee';
    attendees?: Attendee[];
}

export type AttendanceStatus = 'Going' | 'Maybe' | 'Not Going';
export interface Attendee{
    id: number;
    name: string;
    status: AttendanceStatus;
}