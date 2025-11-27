import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// 🔹 Import your event-related components
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventCardComponent } from './events/event-card/event-card.component';
import { AttendanceComponent } from './events/attendance/attendance.component';
import { InvitationsComponent } from './events/invitations/invitations.component';
import { SearchComponent } from './events/search/search.component';

// 🔹 Define routes
const routes: Routes = [
  { path: '', redirectTo: 'events/organized', pathMatch: 'full' },
  { path: 'events/create', component: CreateEventComponent },
  { path: 'events/organized', component: EventListComponent, data: { mode: 'organized' } },
  { path: 'events/invited', component: EventListComponent, data: { mode: 'invited' } },
  { path: 'events/search', component: SearchComponent },
  { path: 'events/:id/invitations', component: InvitationsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    EventListComponent,
    EventCardComponent,
    AttendanceComponent,
    InvitationsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}