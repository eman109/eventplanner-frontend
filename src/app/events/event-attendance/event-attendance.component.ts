import { Component, Input } from '@angular/core';
import { Attendee } from '../models/event.model';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-attendance',
  imports: [CommonModule],
  templateUrl: './event-attendance.component.html',
  styleUrls: ['./event-attendance.component.css']
})
export class EventAttendanceComponent {
  @Input() attendees: Attendee[] = [];
  @Input() eventId!: number;

  constructor(private eventService: EventService) {}

  updateStatus(attendee: Attendee, status: 'Going' | 'Maybe' | 'Not Going') {
    this.eventService.updateAttendance(this.eventId, attendee.id, status)
      .subscribe(() => {
        attendee.status = status; // update UI instantly
      });
  }
}
