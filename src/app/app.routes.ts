import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { EventCardComponent} from './events/event-card/event-card.component'
import { EventListComponent} from './events/event-list/event-list.component'
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventAttendanceComponent } from './events/event-attendance/event-attendance.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path: 'card' , component: EventCardComponent},
  {path: 'events',component:EventListComponent},
  {path: 'create', component: EventCreateComponent},
  {path: 'attendance', component: EventAttendanceComponent}
];
