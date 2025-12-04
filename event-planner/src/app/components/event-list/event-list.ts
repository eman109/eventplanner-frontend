import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { EventCard } from '../event-card/event-card';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, EventCard, NgFor, NgIf, FormsModule],
  templateUrl: './event-list.html',
})
export class EventsList implements OnInit {

  events: any[] = [];
  errorMessage = '';

  searchText: string = '';
  searchKeyword: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  role: string = '';
  showFilter = false;

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

  search() {
    console.log('Apply clicked, filters:', {
      keyword: this.searchKeyword || this.searchText,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      role: this.role
    });

    this.router.navigate(['/events/search'], {
      queryParams: {
        keyword: this.searchKeyword || this.searchText || null,
        dateFrom: this.dateFrom || null,
        dateTo: this.dateTo || null,
        role: this.role || null,
      }
    });
  }
}
