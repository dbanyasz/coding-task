import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineToggle } from './online-toggle';

describe('OnlineToggle', () => {
  let component: OnlineToggle;
  let fixture: ComponentFixture<OnlineToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
