import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event, CreateEventDto, AttendanceStatus, AttendeeStatus, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private base = `${environment.apiBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  // 🔹 Create a new event
  createEvent(dto: CreateEventDto): Observable<Event> {
    return this.http.post<Event>(this.base, dto);
  }

  // 🔹 Delete an event
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // 🔹 Get events organized by the current user
  getMyOrganized(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.base}?role=organizer`);
  }

  // 🔹 Get events where the current user is invited
  getMyInvited(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.base}?role=attendee`);
  }

  // 🔹 Set attendance status (Going / Maybe / Not Going)
  setAttendance(eventId: string, status: AttendanceStatus): Observable<AttendeeStatus[]> {
    return this.http.put<AttendeeStatus[]>(`${this.base}/${eventId}/attendance`, { status });
  }

  // 🔹 Get attendees for an event
  getAttendees(eventId: string): Observable<AttendeeStatus[]> {
    return this.http.get<AttendeeStatus[]>(`${this.base}/${eventId}/attendees`);
  }

  // 🔹 Invite a user to an event
  inviteUser(eventId: string, userEmail: string): Observable<any> {
    return this.http.post(`${this.base}/${eventId}/invite`, { email: userEmail });
  }

  // 🔹 Get invited users for an event
  getInvitedUsers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/${eventId}/invited-users`);
  }

  // 🔹 Advanced search for events
  searchEvents(keyword?: string, dateFrom?: string, dateTo?: string, role?: 'organizer' | 'attendee'): Observable<Event[]> {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    if (role) params = params.set('role', role);
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/search`, { params });
  }
}