import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendee {
  id: string;
  name: string;
  status: AttendanceStatus;
}

export type AttendanceStatus = 'Going' | 'Maybe' | 'Not Going';

export interface Event {
  _id: string; 
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerName: string;
  organizerId: string;
  role: 'organizer' | 'attendee';
  attendees?: Attendee[];
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}


  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // or however you store it
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fix ALL your methods like this:
  searchEvents(params: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search`, {
      headers: this.getAuthHeaders(),
      params: params                     // <-- Angular auto-converts to query string
    });
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getOrganizedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organized`, {
      headers: this.getAuthHeaders()
    });
  }

  getInvitedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/invited`, { headers: this.getAuthHeaders() });
  }

  createEvent(dto: CreateEventDto): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, dto, { headers: this.getAuthHeaders() });
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
  }

  updateAttendance(eventId: string, attendeeId: string, status: 'Going' | 'Maybe' | 'Not Going'): Observable<Attendee> {
    return this.http.put<Attendee>(
      `${this.apiUrl}/${eventId}/attendees/${attendeeId}`,
      { status },
      { headers: this.getAuthHeaders() }
    );
  }

  invite(eventId: string, email: string) {
    return this.http.post(`${this.apiUrl}/${eventId}/invite`, { email });
  }

} 
