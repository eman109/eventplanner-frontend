import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../../services/event.service';
import { Auth } from '../../services/auth'; 
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-invited-events',
  standalone: true,
  imports: [CommonModule, EventCard],
  templateUrl: './invited-events.html',
})
export class InvitedEvents implements OnInit {
  events: Event[] = [];
  loading = true;
  error = '';

  constructor(private eventService: EventService, private auth: Auth) {}

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) {
      this.error = 'User not found. Please login.';
      this.loading = false;
      return;
    }

    this.eventService.getInvitedEvents().subscribe({
      next: (events) => {
        this.events = events.filter(ev =>
          ev.attendees?.some(a => a.id === userId)
        );
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load invited events';
        this.loading = false;
      },
    });
  }
}
