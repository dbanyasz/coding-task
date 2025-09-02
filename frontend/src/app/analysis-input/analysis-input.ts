import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  takeUntil,
} from 'rxjs/operators';
import { TextAnalysisService } from '../service/text-analysis-service';
import { AnalysisMode, AnalysisRequest } from '../model/analysis-request';

type AnalysisFormControls = {
  mode: FormControl<AnalysisMode>;
  input: FormControl<string>;
};

@Component({
  selector: 'app-analysis-input',
  imports: [ReactiveFormsModule],
  templateUrl: './analysis-input.html',
  styleUrl: './analysis-input.less'
})
export class AnalysisInput {

  analysisForm!: FormGroup<AnalysisFormControls>;

  inputSentence = new FormControl();
  private destroy$ = new Subject<void>();

  readonly modes = Object.values(AnalysisMode);

  constructor(private fb: FormBuilder, private textAnalyzerService: TextAnalysisService) {}

  ngOnInit() {
    this.analysisForm = this.fb.group<AnalysisFormControls>({
      mode: new FormControl<AnalysisMode>(AnalysisMode.Consonants, {
        validators: Validators.required,
        nonNullable: true
      }),
      input: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true
      }),
    });

    this.analysisForm.valueChanges
      .pipe(
        filter(() => this.analysisForm.valid),
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) =>
            JSON.stringify(prev) === JSON.stringify(curr)
        ),
        switchMap(() => {
          const payload: AnalysisRequest = this.analysisForm.getRawValue();
          console.log('🔄 Debounced payload →', payload);
          return this.textAnalyzerService.analyze(payload);
        }),

        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          console.log('Server responded with:', response);
        },
        error: (err) => console.error('Request error:', err),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
