import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'create', component: EventCreateComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' ,
    children: [
      { path: '', component: EventListComponent },
      { path: 'create', component: EventCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }