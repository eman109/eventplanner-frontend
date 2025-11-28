import { Component } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent {
  eventId = '';
  email = '';
  message = '';

  constructor(private eventService: EventService) {}

  onInvite() {
    this.eventService.inviteFriend(this.eventId, this.email).subscribe({
      next: (res) => this.message = 'Invitation sent!',
      error: (err) => this.message = 'Failed to send invitation'
    });
  }
}
