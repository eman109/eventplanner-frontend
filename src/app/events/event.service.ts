import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Attendee } from "./models/event.model";

@Injectable({
    providedIn:'root'
})
export class EventService{
    private apiUrl = 'http://localhost:3000/api/events';
    constructor(private http:HttpClient){}
    getOrganizedEvents():Observable<Event[]>{
        return this.http.get<Event[]>(`${this.apiUrl}/organized`);
    }


    getInvitedEvents():Observable<Event[]>{
        return this.http.get<Event[]>(`${this.apiUrl}/invited`);
    }

    createEvent(event:Event):Observable<Event>{
        return this.http.post<Event>(this.apiUrl,event);
    }

    deleteEvent(eventId:number):Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
    }

    updateAttendance(eventId:number, attendeeId:number, status: string): Observable<Attendee>{
        return this.http.put<Attendee>(`${this.apiUrl}/${eventId}/attendees/${attendeeId}`,{status});
    }
}