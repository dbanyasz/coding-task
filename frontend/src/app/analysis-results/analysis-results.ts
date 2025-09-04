import { Component, inject } from '@angular/core';
import { TextAnalysisService } from '../service/text-analysis-service';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';
import { AnalysisResult } from '../model/analysis-models';

@Component({
  selector: 'app-analysis-results',
  imports: [KeyValuePipe, DatePipe],
  templateUrl: './analysis-results.html',
  styleUrl: './analysis-results.less'
})
export class AnalysisResults {

  analysisService = inject(TextAnalysisService);

  public history: AnalysisResult[] = [];

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.analysisService.response$
    .pipe(filter((resp) => resp !== null))
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp) => {
      this.addToHistory(resp);
    });
  }

  private addToHistory(result: AnalysisResult) {
    // Insert newest first (most recent on top)
    this.history.unshift(result);
  
    // Optional: keep only the last N entries to avoid unbounded growth
    const MAX_ENTRIES = 5;
    if (this.history.length > MAX_ENTRIES) {
      this.history.pop();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
