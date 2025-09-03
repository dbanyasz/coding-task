import { TestBed } from '@angular/core/testing';

import { TextAnalysisService } from './text-analysis-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TextAnalyzerService', () => {
  let service: TextAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),    
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(TextAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
