import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { filter } from 'rxjs/operators';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, EventCard],
  templateUrl: './event-list.html',
})
export class EventsList implements OnInit {

  events: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects === '/events') {
          this.loadEvents();
        }
      });
  }

  loadEvents() {
    this.http.get('http://localhost:3000/api/events')
      .subscribe({
        next: (data: any) => this.events = data,
        error: (err) => this.errorMessage = err.error?.message || 'Failed to load events'
      });
  }

  goToCreate() {
    this.router.navigate(['/events/create']);
  }

  displayEventDetails(eventId: string) {
    this.router.navigate([`/events/${eventId}`]);
  }
}
