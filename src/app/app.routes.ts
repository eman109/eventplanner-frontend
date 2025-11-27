import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { InvitationsComponent } from './events/invitations/invitations.component';
import { SearchComponent } from './events/search/search.component'; // if you already have search

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventsComponent }, // hub
  { path: 'events/invitations', component: InvitationsComponent },
  { path: 'events/search', component: SearchComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' }
];
