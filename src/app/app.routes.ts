import { Routes } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { EventCreate } from './components/event-create/event-create';
import { EventsList } from './components/event-list/event-list';
import { EventDetail } from './components/event-details/event-details';
import { OrganizedEvents } from './components/organized-events/organized-events';
import { InvitedEvents } from './components/invited-events/invited-events';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'events/create', component: EventCreate },
  { path: 'events', component: EventsList },
  { path: 'events/:id', component: EventDetail },
  { path: 'events/organized', component: OrganizedEvents },
  { path: 'events/invited', component: InvitedEvents },
];
