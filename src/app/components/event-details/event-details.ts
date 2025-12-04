import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, Event, Attendee } from '../../services/event.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './event-details.html',
})
export class EventDetail implements OnInit {

  attendees: Attendee[] = [];
  event!: Event;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.loadEvent(eventId);
      } else {
        this.errorMessage = 'No event ID provided.';
      }
    });
  }

  loadEvent(id: string) {
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.attendees = event.attendees || [];
        this.cd.detectChanges();
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Failed to load event.';
      }
    });
  }

  // Delete event (JWT included)
  deleteEvent() {
    if (!this.event) return;

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event._id!).subscribe({
        next: () => {
          alert('Event deleted!');
          this.router.navigate(['/events']);
        },
        error: err => {
          console.error(err);
          this.errorMessage = err.error?.message || 'Failed to delete event.';
        }
      });
    }
  }

  // Update attendee status (JWT included)
  updateAttendance(attendee: Attendee, status: 'Going' | 'Maybe' | 'Not Going') {
    if (!this.event?._id) return;

    this.eventService.updateAttendance(this.event._id, attendee.id, status)
      .subscribe({
        next: (updated) => {
          attendee.status = updated.status;
        },
        error: err => {
          console.error(err);
          this.errorMessage = err.error?.message || 'Failed to update status.';
        }
      });
  }
}
