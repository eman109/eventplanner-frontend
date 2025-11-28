import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService){
    this.eventForm = this.fb.group({
      title:['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.eventForm.valid){
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (res) => alert('Event created successfully!'),
        error: (err) => console.error(err),
      });
    }
  }

}
