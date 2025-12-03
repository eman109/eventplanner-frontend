import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card-organized',
  standalone: true,
  templateUrl: './event-card-organized.html'
})
export class EventCardOrganizedComponent {
  @Input() event: any; // organizer events have different structure

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/events', this.event._id]);
  }
}
