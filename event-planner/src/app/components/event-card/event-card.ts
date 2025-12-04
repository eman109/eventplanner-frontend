import { Component, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.html'
})
export class EventCard {
  @Input() event!: Event;

  constructor(private router: Router, private eventService: EventService) {}

  viewDetails() {
    if (!this.event?._id) return;
    this.router.navigate(['/events', this.event._id]);
  }

  deleteEvent() {
    if (!this.event?._id) return;

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event._id).subscribe({
        next: () => {
          alert('Event deleted!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to delete event.');
        }
      });
    }
  }

  // Helper to format date
  get formattedDate(): string {
    return this.event.date ? new Date(this.event.date).toLocaleDateString() : '';
  }
}
