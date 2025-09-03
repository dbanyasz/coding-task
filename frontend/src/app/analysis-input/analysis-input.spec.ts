import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisInput } from './analysis-input';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AnalysisInput', () => {
  let component: AnalysisInput;
  let fixture: ComponentFixture<AnalysisInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisInput],
      providers: [
        provideHttpClient(),    
        provideHttpClientTesting(),
      ]
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
