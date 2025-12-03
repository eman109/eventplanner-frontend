import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService, Event } from '../../services/event.service';
import { EventCard } from '../event-card/event-card';
import { Auth } from '../../services/auth';

interface BackendEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-organized-events',
  standalone: true,
  imports: [CommonModule, RouterModule, EventCard],
  templateUrl: './organized-events.html',
})
export class OrganizedEvents implements OnInit {
  events: Event[] = [];
  loading = true;
  error?: string;

  constructor(private eventService: EventService, private auth: Auth) {}

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) {
      this.error = 'User not found. Please login.';
      this.loading = false;
      return;
    }

    // Cast to any to avoid TS type mismatch
    this.eventService.getOrganizedEvents()
      .subscribe((backendEvents: any) => {
        // Map backend events to frontend Event interface
        this.events = backendEvents.map((be: BackendEvent) => ({
          _id: be._id,
          title: be.title,
          description: be.description,
          date: be.date,
          time: be.time,
          location: be.location,
          organizerId: be.organizer,
          organizerName: 'You', // placeholder
          role: 'organizer',
          attendees: [],
        }));
        this.loading = false;
      }, (err) => {
        console.error(err);
        this.error = err.error?.message || 'Failed to load organized events';
        this.loading = false;
      });
  }
}
