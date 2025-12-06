import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventCard } from '../event-card/event-card';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-search-results',
  standalone: true,
  imports: [CommonModule, EventCard, NgFor, NgIf],
  templateUrl: './search-results.html'
})
export class SearchResults implements OnInit {
  results: any[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters = {
        keyword: params['keyword'] || '',
        dateFrom: params['dateFrom'] || '',
        dateTo: params['dateTo'] || '',
        role: params['role'] || ''
      };

      this.eventService.searchEvents(filters).subscribe({
        next: (res: any) => {
          this.results = res.events || res;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    });
  }
}
