import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisInput } from './analysis-input';

describe('AnalysisInput', () => {
  let component: AnalysisInput;
  let fixture: ComponentFixture<AnalysisInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
