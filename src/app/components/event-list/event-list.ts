import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { EventCard }  from '../event-card/event-card';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, EventCard],
  templateUrl: './event-list.html',
})
export class EventsList implements OnInit, OnDestroy {
  events: any[] = [];
  errorMessage = '';
  loading = true;                    // ← ADD THIS
  private routerSub!: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();   // ← This runs on first load

    // This runs EVERY time user navigates to /events (even from login)
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/events' || event.urlAfterRedirects === '/events/') {
          this.loadEvents();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadEvents() {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load events';
        this.events = [];
        this.loading = false;
      }
    });
  }

  goToCreate() {
    this.router.navigate(['/events/create']);
  }

  displayEventDetails(eventId: string) {
    this.router.navigate([`/events/${eventId}`]);
  }
}