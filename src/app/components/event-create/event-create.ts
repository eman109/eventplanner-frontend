import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService, CreateEventDto } from '../../services/event.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.html',
})
export class EventCreate {
  errorMessage = '';
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  // Submit form
  onSubmit() {
    if (this.eventForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const eventData: CreateEventDto = this.eventForm.value;

    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        // Navigate to events list after successful creation
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Failed to create event';
      },
    });
  }
}
