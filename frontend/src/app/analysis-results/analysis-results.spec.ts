import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisResults } from './analysis-results';

describe('AnalysisResults', () => {
  let component: AnalysisResults;
  let fixture: ComponentFixture<AnalysisResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
