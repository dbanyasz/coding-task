import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisResults } from './analysis-results';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AnalysisResults', () => {
  let component: AnalysisResults;
  let fixture: ComponentFixture<AnalysisResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisResults],
      providers: [
        provideHttpClient(),    
        provideHttpClientTesting(),
      ]
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
