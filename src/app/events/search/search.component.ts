import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  keyword = '';
  dateFrom = '';
  dateTo = '';
  role: 'organizer' | 'attendee' | '' = '';
  results: Event[] = [];
  error = '';
  loading = false;

  constructor(private eventsSvc: EventService) {}

  search() {
    this.loading = true;
    this.error = '';
    this.eventsSvc.searchEvents(
      this.keyword,
      this.dateFrom,
      this.dateTo,
      this.role || undefined
    ).subscribe({
      next: (list) => { this.results = list; this.loading = false; },
      error: (err) => { this.error = err?.error?.message ?? 'Search failed'; this.loading = false; }
    });
  }
}
