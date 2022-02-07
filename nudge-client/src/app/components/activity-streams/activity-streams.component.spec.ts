import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStreamsComponent } from './activity-streams.component';

describe('ActivityStreamsComponent', () => {
  let component: ActivityStreamsComponent;
  let fixture: ComponentFixture<ActivityStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityStreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
