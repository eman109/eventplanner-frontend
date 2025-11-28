import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { User } from '../models';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  @Input() eventId!: string;   // event ID passed from parent
  invitedUsers: User[] = [];
  email = '';
  error = '';
  loading = false;

  constructor(private eventsSvc: EventService) {}

  ngOnInit() {
    this.loadInvited();
  }

  loadInvited() {
    this.loading = true;
    this.eventsSvc.getInvitedUsers(this.eventId).subscribe({
      next: (users) => { this.invitedUsers = users; this.loading = false; },
      error: (err) => { this.error = err?.error?.message ?? 'Failed to load invited users'; this.loading = false; }
    });
  }

  invite() {
    if (!this.email) return;
    this.loading = true;
    this.eventsSvc.inviteUser(this.eventId, this.email).subscribe({
      next: () => { this.loadInvited(); this.email = ''; this.loading = false; },
      error: (err) => { this.error = err?.error?.message ?? 'Failed to send invitation'; this.loading = false; }
    });
  }
}
