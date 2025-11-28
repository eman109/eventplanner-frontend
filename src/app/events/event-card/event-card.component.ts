import { Component, Input } from '@angular/core';
import { Event, Attendee, AttendanceStatus } from '../models/event.model';
import { EventService } from '../event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event! : Event;

  constructor(private eventService: EventService){}


  deleteEvent(){
    if(confirm('Are you sure you want to delete this event?')){
      this.eventService.deleteEvent(this.event.id).subscribe(() =>{
        alert('Event deleted successfully!');
      });
  }
}

updateStatus(attendee: Attendee, status: AttendanceStatus){
  this.eventService.updateAttendance(this.event.id, attendee.id, status).subscribe(() => {
    attendee.status = status;
  });
}
}
