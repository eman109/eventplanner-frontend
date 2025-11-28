import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then(m => m.EventsModule)
  },

  { path: '', redirectTo: '/signup', pathMatch: 'full' }
];
