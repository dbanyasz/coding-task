import { TestBed } from '@angular/core/testing';

import { TextAnalysisService } from './text-analysis-service';

describe('TextAnalyzerService', () => {
  let service: TextAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
