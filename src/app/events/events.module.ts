import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    EventCreateComponent
  ]
})
export class EventsModule { }
