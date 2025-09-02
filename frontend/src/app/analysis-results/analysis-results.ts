import { Component, inject } from '@angular/core';
import { LetterCountResponse, TextAnalysisService } from '../service/text-analysis-service';
import { KeyValuePipe } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-analysis-results',
  imports: [KeyValuePipe],
  templateUrl: './analysis-results.html',
  styleUrl: './analysis-results.less'
})
export class AnalysisResults {

  analysisService = inject(TextAnalysisService);
  letterCount: LetterCountResponse | null = null;

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.analysisService.response$
    .pipe(filter((resp) => resp !== null))
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp) => {
      this.letterCount = resp;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
