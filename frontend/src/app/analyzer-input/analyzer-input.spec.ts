import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerInput } from './analyzer-input';

describe('AnalyzerInput', () => {
  let component: AnalyzerInput;
  let fixture: ComponentFixture<AnalyzerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
