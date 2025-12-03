export interface BackendEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string; // backend field
  createdAt: string;
  updatedAt: string;
  __v: number;
}
