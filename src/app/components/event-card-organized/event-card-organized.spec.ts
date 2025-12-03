import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardOrganized } from './event-card-organized';

describe('EventCardOrganized', () => {
  let component: EventCardOrganized;
  let fixture: ComponentFixture<EventCardOrganized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardOrganized]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardOrganized);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
