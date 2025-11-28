import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from "../event-card/event-card.component";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [ReactiveFormsModule, EventCardComponent],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  organizedEvents: Event[] = [];
  invitedEvents: Event[] = [];

  constructor(private eventService: EventService){}

  ngOnInit(){
    this.loadEvents();
  }

  loadEvents(){
    this.eventService.getOrganizedEvents().subscribe((events)=> this.organizedEvents = events);
    this.eventService.getInvitedEvents().subscribe((events)=> this.invitedEvents = events);
    
  }

}
